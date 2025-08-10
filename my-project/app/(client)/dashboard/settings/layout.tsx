"use client";
import type React from "react";
import {SidebarProvider} from "@/components/client/ux/sidebar";
import {settingsItems, SettingsSidebar,} from "../_components/settings-sidebar";
import {Button} from "@/components/client/ux/button";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";

export default function SettingsLayout({
                                           children,
                                       }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const renderPageHeader = () => {
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
                        onClick={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.delete("edit"); // remove edit mode
                            params.set("view", "true"); // set view mode
                            router.push(`?${params.toString()}`, { scroll: false });
                        }}
                        variant={searchParams.has("view") ? "theme" : "outline"}
                        size="lg"
                        className="text-sm sm:text-xs shadow-none grow sm:grow-0"
                    >
                        View Profile
                    </Button>
                </div>
            </div>
        );
    };

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
                                {renderPageHeader()}
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
                        {renderPageHeader()}
                    </div>
                    {children}
                </main>
            </div>
        </>
    );
}