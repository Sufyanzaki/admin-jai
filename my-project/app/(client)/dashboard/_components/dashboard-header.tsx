"use client"

import {Badge} from "@/components/client/ux/badge"
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/client/ux/sheet";
import {Button} from "@/components/client/ux/button";
import {LogOut, Menu, UserRoundSearch} from "lucide-react";
import {Sidebar, SidebarFooter, SidebarHeader, SidebarRail} from "@/components/client/ux/sidebar";
import Link from "next/link";
import SidebarData from "@/app/(client)/dashboard/_components/sidebar-data";
import type React from "react";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {DashboardList} from "./dashboard-list";
import ImageWrapper from "@/components/client/image-wrapper";
import {signOut} from "next-auth/react";
import {useProfile} from "@/app/shared-hooks/useProfile";
import Preloader from "@/components/shared/Preloader";

type MenuItem = {
  label: string;
  href: string;
  badge?: number;
  badgeColor?: string;
};

export function DashboardHeader() {

  console.log("render")

  const {user, userLoading} = useProfile();

  if(userLoading) return <div className="py-2 flex justify-end px-6"><Preloader size="sm" /></div>;

  const menuItems: MenuItem[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Matches", href: "/dashboard/matches" },
    { label: "My Visits", href: "/dashboard/visits" },
    { label: "Notification", href: "/dashboard/notifications/received" },
    { label: "Liked Profile", href: "/dashboard/notifications/received" },
    { label: "Messages", href: "/dashboard/chat", badge: user?.messageCount, badgeColor: "bg-cyan-500" },
    { label: "My Profile", href: "/dashboard/settings/account" },
  ];

  const lockedItems: MenuItem[] = [
    { label: "Complete Profile", href: user?.route ?? "/auth/profile/create" },
  ];

  const allowedItems: MenuItem[] = user?.route === "/auth/profile/partner-preferences" ? menuItems : lockedItems;

  return (
      <>
        <header className="p-4 sm:p-6 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 xl:hidden justify-between w-full">
              <ImageWrapper
                  src="https://ticketprijs.nl/admin/Image/AppSettings/Logo/1730289473_1730098174_1727434463_logo-alt.png"
                  alt="Logo"
                  className="w-[150px]"
              />
              <div className="flex gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-fit xl:hidden">
                      <UserRoundSearch />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[320px] p-0 bg-app-blue text-white">
                    <Sidebar className="h-full" collapsible="none">
                      <SidebarHeader className="p-6">
                        <div className="flex items-center justify-between gap-2">
                          <Link href="#">
                            <ImageWrapper src="/dashboardLogo.png" className="w-36" alt="logo" />
                          </Link>
                        </div>
                      </SidebarHeader>
                      <SidebarData />
                      <SidebarFooter className="p-4">
                        <Button
                            variant="dashboard"
                            size="dashboard"
                            className="border border-white/50 text-white hover:bg-transparent w-full"
                            onClick={() => signOut({ callbackUrl: "/auth/login" })}
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="group-data-[collapsible=icon]:hidden ml-2 text-sm">Logout</span>
                        </Button>
                      </SidebarFooter>

                      <SidebarRail />
                    </Sidebar>
                  </SheetContent>
                </Sheet>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-fit">
                      <Menu />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full p-0">
                    <VisuallyHidden>
                      <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                      </SheetHeader>
                    </VisuallyHidden>
                    <DashboardList />
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <nav className="hidden xl:flex justify-end w-full items-center gap-6 font-poppins font-semibold text-[16px] tracking-normal">
              {allowedItems.map(({ label, href, badge, badgeColor }) => (
                  <div key={label} className="relative">
                    <a
                        href={href}
                        className="text-gray-600 hover:text-gray-900 uppercase"
                    >
                      {label}
                    </a>
                    {badge !== undefined && (
                        <Badge
                            className={`absolute -top-4 -right-3 h-[22px] w-[22px] flex items-center justify-center rounded-full font-poppins font-semibold text-[12px] text-white ${badgeColor}`}
                        >
                          {badge}
                        </Badge>
                    )}
                  </div>
              ))}
            </nav>
          </div>
        </header>
      </>
  )
}
