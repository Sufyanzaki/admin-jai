"use client"

import { DashboardLayout } from "@/components/dashboard-layout";
import { Toaster } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && status === "unauthenticated") {
            router.push("/auth/login");
        }
    }, [mounted, status, router]);

    // Don't render anything until mounted to prevent hydration issues
    if (!mounted) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // Show loading state while checking authentication
    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // Don't render anything if not authenticated
    if (status === "unauthenticated") {
        return null;
    }

    return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthWrapper>
            <DashboardLayout>
                <Toaster richColors position="top-right" />
                {children}
            </DashboardLayout>
        </AuthWrapper>
    );
}