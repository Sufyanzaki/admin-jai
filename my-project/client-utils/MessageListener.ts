"use client";

import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher.js";
import { ChatMessage } from "@/app/(client)/dashboard/chat/_types/message";
import {useParams} from "next/navigation";

interface MessageListenerProps {
    onMessage: (message: ChatMessage) => void;
}

export const MessageListener = ({ onMessage }: MessageListenerProps) => {

    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? '';

    useEffect(() => {
        const pusher = pusherClient();
        const channel = pusher.subscribe(`chat-${id}`);
        console.log("Subscribed to channel:", channel.name);
        channel.bind("new-message", (data: Partial<ChatMessage>) => {
            if (!data || !data.sender) {
                console.warn("Received malformed message:", data);
                return;
            }

            const newMessage: ChatMessage = {
                id: String(Date.now()),
                content: data.content ?? "",
                time: null,
                senderId: Number(data.sender.id!),
                chatId: data.chatId!,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                sender: data.sender,
            };

            onMessage(newMessage);

        });

        return () => {
            channel.unbind("new-message");
            pusher.unsubscribe(`chat-2`);
        };
    }, []);

    return null;
};
