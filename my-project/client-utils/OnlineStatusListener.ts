"use client";

import { useEffect } from "react";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";
import {usePathname} from "next/navigation";
import {postPageView} from "@/app/(client)/dashboard/_api/pageView";

interface OnlineStatusListenerProps {
    onStatusChange?: (status: { userId: string; online: boolean }) => void;
}

export default function OnlineStatusListener({ onStatusChange }: OnlineStatusListenerProps) {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const pathname = usePathname();

    useEffect(() => {
        postPageView({pageLink: pathname}).finally()
    }, [pathname]);

    useEffect(() => {
        if (!userId) return;

        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
            cluster: "ap2",
            authEndpoint: "https://sea-lion-app-2-2v2ob.ondigitalocean.app/api/v1/message/pusher/autenticate",
            auth: {
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                },
            },
        });

        const channelName = `presence-users`;
        const channel = pusher.subscribe(channelName);

        channel.bind("pusher:member_added", (member: any) => {
            console.log(member, "pusher:member_added")
            if (onStatusChange) {
                onStatusChange({ userId: member.id, online: true });
            }
        });

        channel.bind("pusher:member_removed", (member: any) => {
            console.log(member, "pusher:member_removed")
            if (onStatusChange) {
                onStatusChange({ userId: member.id, online: false });
            }
        });

        return () => {
            channel.unbind("pusher:member_added");
            channel.unbind("pusher:member_removed");
            pusher.unsubscribe(channelName);
            pusher.disconnect();
        };
    }, [userId, onStatusChange]);

    return null;
}