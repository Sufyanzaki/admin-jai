"use client";

import ErrorBoundary from "@/admin-utils/ErrorBoundary";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function Providers({
                                      children,
                                      session: serverSession
                                  }: {
    children: React.ReactNode;
    session: Session | null;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <SessionProvider session={serverSession}>
            <AuthGuard mounted={mounted}>
                <ErrorBoundary>
                    <ThemeProvider attribute="class" enableSystem={mounted}>
                        {children}
                    </ThemeProvider>
                </ErrorBoundary>
            </AuthGuard>
        </SessionProvider>
    );
}

function AuthGuard({ children, mounted }: { children: React.ReactNode; mounted: boolean }) {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (mounted && status === "unauthenticated") {
            router.push("/auth/login");
        }
    }, [mounted, status, router]);

    if (!mounted || status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return <>{children}</>;
}