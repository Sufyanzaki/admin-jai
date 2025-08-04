"use client";
import type React from "react";
import { SidebarProvider } from "@/components/client/ux/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  notificationItems,
  NotificationSidebar,
} from "@/app/(client)/dashboard/_components/notification-sidebar";

export default function NotificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <>
      <div className="hidden lg:block">
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full">
            <div className="hidden xl:block">
              <NotificationSidebar />
            </div>
            <main className="p-6 flex-1 space-y-6">{children}</main>
          </div>
        </SidebarProvider>
      </div>
      <div className="block lg:hidden px-4 py-6">
        <div className="max-w-screen mx-auto overflow-x-auto flex flex-row gap-3 mb-6">
          {notificationItems.map((item, i) => {
            const isActive = pathname.includes(item.href);

            return (
              <div
                key={i}
                className={`text-nowrap font-medium text-sm p-4 mb-2 rounded-[5px] transition-colors h-auto ${
                  isActive
                    ? "bg-blue-50 text-app-blue"
                    : "text-black hover:bg-gray-50 hover:text-black border border-gray-50 shadow-none"
                }`}
              >
                <Link
                  href={item.href}
                  className="flex flex-row items-center gap-3"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              </div>
            );
          })}
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
