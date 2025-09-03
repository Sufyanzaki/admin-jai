import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { SidebarProvider } from "@/components/client/ux/sidebar";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { DashboardHeader } from "@/app/(client)/dashboard/_components/dashboard-header";
import OnlineStatusListener from "@/client-utils/OnlineStatusListener";
import CustomFooter from "@/app/(client)/dashboard/_components/footer";

export async function validateSession() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return { isValid: false, redirect: "/auth/login" };
    }

    return { isValid: true, session };
}

export default async function DashboardLayout({
                                                  children,
                                              }: {
    children: ReactNode;
}) {
    const { isValid, redirect: to } = await validateSession();

    if (!isValid && to) {
        redirect(to);
    }

    return (
        <SidebarProvider defaultOpen={true}>
            <OnlineStatusListener onStatusChange={() => {}} />
            <DashboardSidebar />
            <div className="w-full flex flex-col min-h-screen">
                <nav className="sticky top-0 z-40 bg-white/10 backdrop-blur-md border-b border-gray-500/20 ml-auto w-full">
                    <DashboardHeader />
                </nav>
                <main className="flex-1 overflow-auto w-full">{children}</main>
                <CustomFooter />
            </div>
        </SidebarProvider>
    );
}
