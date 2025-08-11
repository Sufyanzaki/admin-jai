"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import { usePusherClient } from "@/lib/pusher.js";

interface Message {
    id: string;
}

interface MessagesData {
    messages: Message[];
}

export const MessageListener = () => {
    const searchParams = useSearchParams();
    const conversationId = searchParams.get("conversationId");
    const pusherClient = usePusherClient();
    const { mutate } = useSWRConfig();

    useEffect(() => {
        if (!conversationId || !pusherClient) return;
        const channel = pusherClient.subscribe(`conversation-${conversationId}`);
        const messageHandler = (newMessage: Message) => {
            const cacheKey = [`/api/messages`, conversationId];
            mutate<MessagesData>(
                cacheKey,
                (currentData) => {
                    if (!currentData) {
                        return { messages: [newMessage] };
                    }
                    return {
                        ...currentData,
                        messages: [...currentData.messages, newMessage],
                    };
                },
                { revalidate: false }
            ).finally();
        };

        channel.bind("new-message", messageHandler);

        return () => {
            channel.unbind("new-message", messageHandler);
            channel.unsubscribe();
        };
    }, [conversationId, pusherClient, mutate]);

    return null;
};