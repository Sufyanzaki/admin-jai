"use client"

import {DashboardLayout} from "@/components/admin/dashboard-layout";
import {Toaster} from "sonner";
import {useSession} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";
import {clearUserTrackingId, getUserTrackingId} from "@/lib/access-token";
import { signOut } from "next-auth/react";

function AuthWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { status, data } = useSession();

    useEffect(() => {
        if (status === "unauthenticated" || data?.user.role === "CLIENT") {
            signOut({ redirect: false }).then(() => {
                router.push("/admin/auth/login");
            });
        }
    }, [status, data, router]);

    if (status === "unauthenticated" || data?.user.role === "CLIENT") {
        return null;
    }

    return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const tracker = getUserTrackingId();
        if(!pathname.includes("members/add") && tracker?.id) clearUserTrackingId();
    }, [pathname]);

    return (
        <AuthWrapper>
            <DashboardLayout>
                <Toaster richColors position="top-right" />
                {children}
            </DashboardLayout>
        </AuthWrapper>
    );
}