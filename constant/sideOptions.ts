import {
    Ambulance,
    BarChart3,
    Calendar,
    HelpCircle,
    LayoutDashboard,
    Megaphone, MessageCircle, Settings,
    Settings2, TrendingUp, UserCog,
    UserRound,
    Users
} from "lucide-react";


export const sidebarItems = [
    {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Members",
        href: "/members",
        icon: Users,
    },
    {
        title: "Profile Attributes",
        href: "/profile-attributes",
        icon: Calendar,
    },
    {
        title: "Payments",
        href: "/payments",
        icon: UserRound,
    },
    {
        title: "Frontend Settings",
        href: "/frontend-settings",
        icon: Settings2,
    },
    {
        title: "FAQ",
        href: "/faq",
        icon: HelpCircle,
    },
    {
        title: "BLOGS",
        href: "/blogs/list",
        icon: Ambulance,
        submenu: [
            { title: "List", href: "/blogs/list" },
            { title: "Category", href: "/blogs/category" },
        ],
    },
    {
        title: "Packages",
        href: "/packages",
        icon: Calendar,
    },
    {
        title: "Complaints",
        href: "/complains",
        icon: Megaphone,
    },
    {
        title: "Report",
        href: "/reports",
        icon: BarChart3,
        submenu: [
            { title: "Overview", href: "/reports" },
            { title: "Detailed Reports", href: "/reports/detailed" },
            { title: "Financial Reports", href: "/reports/financial" },
            { title: "Income Reports", href: "/reports/income" },
            { title: "Member Reports", href: "/reports/member" },
            { title: "Analytics", href: "/reports/analytics" },
        ],
    },
    {
        title: "Marketing",
        href: "/marketing/newsletter",
        icon: TrendingUp,
        submenu: [
            { title: "Newsletter", href: "/marketing/newsletter" },
            { title: "Banners", href: "/marketing/banners" },
        ],
    },
    {
        title: "Setting",
        href: "/settings",
        icon: Settings,
        submenu: [
            { title: "General Settings", href: "/settings" },
            { title: "Notifications", href: "/settings/notifications" },
            { title: "Integrations", href: "/settings/integrations" },
            { title: "Languages", href: "/settings/languages" },
            { title: "Other Settings", href: "/settings/other-settings" },
        ],
    },
    {
        title: "Staff",
        href: "/staff",
        icon: UserCog,
        submenu: [
            { title: "All Staff", href: "/staff" },
            { title: "Add Staff", href: "/staff/add" },
            { title: "Roles & Permissions", href: "/staff/roles" },
        ],
    },
    {
        title: "Chat & Video Setting",
        href: "/video-setting",
        icon: Calendar,
    },
    {
        title: "Chat",
        href: "/chat",
        icon: MessageCircle,
    },
    {
        title: "Support",
        href: "/support",
        icon: HelpCircle,
    },
];