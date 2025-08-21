"use client";

import React, {useEffect} from "react";
import {SidebarProvider} from "@/components/client/ux/sidebar";
import {DashboardSidebar} from "./_components/dashboard-sidebar";
import {DashboardFooter} from "./_components/dashboard-footer";
import {DashboardHeader} from "@/app/(client)/dashboard/_components/dashboard-header";
import {usePathname} from "next/navigation";
import {postPageView} from "@/app/(client)/dashboard/_api/pageView";
import OnlineStatusListener from "@/client-utils/OnlineStatusListener";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

    useEffect(() => {
        postPageView({pageLink: pathname}).finally()
    }, [pathname]);

  return (
    <SidebarProvider defaultOpen={true}>
        <OnlineStatusListener onStatusChange={()=>{}} />
      <DashboardSidebar />
      <div className="w-full flex flex-col min-h-screen">
        <nav className="sticky top-0 z-40 bg-white/10 backdrop-blur-md border-b border-gray-500/20 ml-auto w-full">
          <DashboardHeader />
        </nav>
        <main className="flex-1 overflow-auto w-full">{children}</main>
        {!pathname.startsWith("/dashboard/chat/") && <DashboardFooter />}
      </div>
    </SidebarProvider>
  );
}
