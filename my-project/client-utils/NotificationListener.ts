"use client";

import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher.js";
import { useSession } from "next-auth/react";

interface NotificationListenerProps {
  onMessage: () => void;
}

export default function NotificationListener({ onMessage }: NotificationListenerProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    const pusher = pusherClient();
    const channel = pusher.subscribe(`user-${userId}`);

    console.log("Subscribed to channel:", channel.name);

    channel.bind("new-message-notification", () => {
      onMessage();

      const audio = new Audio("/notification.mp3");
      audio.play().catch(() => {});
    });

    return () => {
      channel.unbind("new-message-notification");
      pusher.unsubscribe(`user-${userId}`);
    };
  }, [userId, onMessage]);

  return null;
}