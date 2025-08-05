"use client";

import ErrorBoundary from "@/admin-utils/ErrorBoundary";
import {ReactNode, useEffect, useState} from "react";
import {SessionProvider, useSession} from "next-auth/react";
import {Session} from "next-auth";
import {useRouter} from "next/navigation";
import Preloader from "@/components/shared/Preloader";

export default function ClientProvider({
                                      children,
                                      session: serverSession
                                  }: {
    children: ReactNode;
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
                    {children}
                </ErrorBoundary>
            </AuthGuard>
        </SessionProvider>
    );
}

function AuthGuard({ children, mounted }: { children: ReactNode; mounted: boolean }) {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {

        if (mounted && (status === "unauthenticated")) {
            router.push("/auth/login");
        }
    }, [mounted, status, router]);

    if (!mounted || status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Preloader />
            </div>
        );
    }

    return <>{children}</>;
}