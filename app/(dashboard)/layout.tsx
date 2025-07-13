"use client"

import { DashboardLayout } from "@/components/dashboard-layout";
import { Toaster } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { status } = useSession();

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