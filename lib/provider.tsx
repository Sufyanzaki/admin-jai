"use client";

import ErrorBoundary from "@/admin-utils/ErrorBoundary";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import {Session} from "next-auth";

export default function Providers({
                                      children,
                                      session
                                  }: {
    children: React.ReactNode;
    session: Session | null;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <SessionProvider session={session}>
            <ErrorBoundary>
                <ThemeProvider attribute="class" enableSystem={mounted}>
                    {children}
                </ThemeProvider>
            </ErrorBoundary>
        </SessionProvider>
    );
}