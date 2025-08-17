"use client";

import ErrorBoundary from "@/admin-utils/ErrorBoundary";
import {ReactNode, useEffect } from "react";
import {SessionProvider, useSession} from "next-auth/react";
import {Session} from "next-auth";
import {usePathname, useRouter} from "next/navigation";
import Preloader from "@/components/shared/Preloader";

export default function ClientProvider({
                                      children,
                                      session: serverSession
                                  }: {
    children: ReactNode;
    session: Session | null;
}) {

    return (
        <SessionProvider session={serverSession}>
            <AuthGuard>
                <ErrorBoundary>
                    {children}
                </ErrorBoundary>
            </AuthGuard>
        </SessionProvider>
    );
}


function AuthGuard({ children }: { children: ReactNode }) {
    const { status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const isProtectedPath = pathname.includes("/dashboard");

    useEffect(() => {
        if (status === "unauthenticated" && isProtectedPath) {
            router.push("/auth/login");
        }
    }, [status, router, isProtectedPath]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Preloader />
            </div>
        );
    }

    return <>{children}</>;
}
