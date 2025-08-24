"use client";

import { ChevronLeft, ChevronRight, MessageSquare, Send, Star, Trash2, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/client/ux/sidebar";
import { useTranslation } from "react-i18next";

export function NotificationSidebar() {
    const { t } = useTranslation();
    const pathname = usePathname();
    const { open, toggleSidebar } = useSidebar();

    const notificationItems = [
        {
            title: t("Received"),
            icon: User,
            href: "/dashboard/notifications/received",
            count: 6,
        },
        {
            title: t("Accepted"),
            icon: Star,
            href: "/dashboard/notifications/accepted",
        },
        {
            title: t("Sent"),
            icon: Send,
            href: "/dashboard/notifications/sent",
        },
        {
            title: t("Request"),
            icon: MessageSquare,
            href: "/dashboard/notifications/request",
        },
        {
            title: t("Trash"),
            icon: Trash2,
            href: "/dashboard/notifications/trash",
        },
    ];

    return (
        <div className={`${open ? "w-64" : ""}`}>
            <Sidebar
                className={`bg-white border-r border-gray-200 relative ${open ? "w-64" : ""}`}
                collapsible="icon"
            >
                <SidebarHeader className="px-2 py-2">
                    <div className={`flex items-center ${open ? "justify-end" : "justify-center"}`}>
                        <button
                            onClick={toggleSidebar}
                            className="p-2 hover:bg-gray-100 rounded-md transition"
                        >
                            {open ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                        </button>
                    </div>
                </SidebarHeader>

                <SidebarContent className="px-2 py-2">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-1">
                                {notificationItems.map((item) => {
                                    const isActive = pathname.includes(item.href);
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                className={`flex items-center gap-3 px-3 py-3 font-medium text-sm rounded-[5px] transition-colors h-auto ${
                                                    isActive
                                                        ? "bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
                                                        : "text-black hover:bg-gray-50 hover:text-black"
                                                }`}
                                            >
                                                <Link href={item.href}>
                                                    <item.icon className="w-4 h-4" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
    );
}
