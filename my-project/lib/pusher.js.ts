"use client";

import { useSession } from "next-auth/react";
import Pusher from "pusher-js";

let pusherClient: Pusher | null = null;

export const usePusherClient = () => {
    const { data: session } = useSession();

    if (!session) return null;

    const token = session?.token;

    const appKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    if (!appKey) {
        throw new Error("Missing NEXT_PUBLIC_PUSHER_APP_KEY environment variable");
    }

    if (!pusherClient) {
        pusherClient = new Pusher(appKey, {
            cluster: "ap2",
            encrypted: true,
            authEndpoint: `${process.env.NEXT_PUBLIC_BASE_URI}/pusher/auth`,
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        });
    }

    return pusherClient;
};
