"use client";
import type React from "react";
import { SidebarProvider } from "@/components/client/ux/sidebar";
import {
  settingsItems,
  SettingsSidebar,
} from "../_components/settings-sidebar";
import { Button } from "@/components/client/ux/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const renderPageHeader = (pathname: string) => {
  switch (true) {
    case pathname.includes("expectation"):
      return (
        <div className="flex items-center justify-between py-4 mb-12 border-b">
          <h1 className="text-2xl sm:text-4xl font-semibold">
            Partner Expectations
          </h1>
        </div>
      );

    case pathname.includes("blocked"):
      return (
        <div className="flex flex-col items-start justify-start mb-9 space-y-2">
          <h1 className="text-4xl font-semibold">Blocked Profiles</h1>
          <p className="text-sm sm:text-base">
            Here are the profiles you have blocked
          </p>
        </div>
      );

    case pathname.includes("photo"):
      return (
        <div className="flex flex-col items-start justify-start mb-9 space-y-2">
          <h1 className="text-2xl sm:text-4xl font-semibold">Photo Settings</h1>
          <p className="text-sm sm:text-base">
            Manage your profile photos and visibility settings
          </p>
        </div>
      );

    case pathname.includes("support"):
      return (
        <div className="flex flex-col items-start justify-start mb-9 space-y-2">
          <h1 className="text-2xl sm:text-4xl font-semibold">
            Support Tickets
          </h1>
          <p className="text-sm sm:text-base">
            Get help with any issues or questions you may have
          </p>
        </div>
      );

    default:
      return (
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 w-full gap-4">
          <div className="space-y-2 w-full sm:w-auto">
            <h1 className="text-2xl sm:text-4xl font-semibold">My Account</h1>
            <p className="text-sm sm:text-base">
              Here&apos;s an overview of your account
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="text-sm sm:text-xs shadow-none bg-[#EEF0F5] grow sm:grow-0"
            >
              Edit Profile
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-sm sm:text-xs shadow-none bg-[#EEF0F5] grow sm:grow-0"
            >
              View Profile
            </Button>
          </div>
        </div>
      );
  }
};

export default function SettingsLayout({
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
              <SettingsSidebar />
            </div>
            <div className="flex flex-col flex-1 p-6">
              <main className="flex-1 space-y-6">
                {renderPageHeader(pathname)}
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </div>
      <div className="block lg:hidden px-4 py-6">
        <div className="max-w-screen mx-auto overflow-x-auto flex flex-row gap-3 mb-6">
          {settingsItems.map((item, i) => {
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

        <main className="flex-1">
          <div className="flex flex-col items-start gap-4">
            {renderPageHeader(pathname)}
          </div>
          {children}
        </main>
      </div>
    </>
  );
}
