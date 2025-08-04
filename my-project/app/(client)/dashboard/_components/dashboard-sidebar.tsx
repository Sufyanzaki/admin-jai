"use client";

import { LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/client/ux/sidebar";
import { Button } from "@/components/client/ux/button";
import Link from "next/link";
import type React from "react";
import SidebarData from "@/app/(client)/dashboard/_components/sidebar-data";
import ImageWrapper from "@/components/client/image-wrapper";

export function DashboardSidebar() {
  const { open } = useSidebar();

  return (
    <div className="hidden xl:block">
      <Sidebar
        className={`bg-app-blue text-white flex min-h-screen z-50 ${
          open ? "w-[320px]" : ""
        }`}
        collapsible="icon"
      >
        <SidebarHeader className={open ? "p-6" : "px-3 py-6"}>
          <div
            className={`flex items-center gap-2 ${
              open ? "justify-between" : "justify-center"
            }`}
          >
            {open && (
              <Link href="#">
                <ImageWrapper
                  width={230}
                  height={230}
                  src="/dashboardLogo.png"
                  className="w-36"
                  alt="logo"
                />
              </Link>
            )}
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarData />
        <SidebarFooter className="p-4 flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="dashboard"
            className="border rounded-[5px] border-white/50 text-white hover:bg-transparent w-full group-data-[collapsible=icon]:hidden"
          >
            <LogOut className="w-4 h-4" />
            <span className="ml-2 text-sm">Logout</span>
          </Button>

          <SidebarMenuButton
            tooltip="Logout"
            className="hidden group-data-[collapsible=icon]:flex text-white hover:bg-transparent h-10 w-10 p-0 rounded-[5px]"
          >
            <LogOut className="w-4 h-4" />
          </SidebarMenuButton>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}
