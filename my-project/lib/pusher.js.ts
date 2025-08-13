"use client";

import Pusher from "pusher-js";

export const pusherClient = () => {
    const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    if (!key) throw new Error("NEXT_PUBLIC_PUSHER_APP_KEY is not set");

    return new Pusher(key, {
        cluster: "ap2",
    });
};
