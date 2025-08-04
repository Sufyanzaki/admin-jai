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
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Members",
        href: "/admin/members",
        icon: Users,
    },
    {
        title: "Profile Attributes",
        href: "/admin/profile-attributes",
        icon: Calendar,
    },
    {
        title: "Payments",
        href: "/admin/payments",
        icon: UserRound,
    },
    {
        title: "Frontend Settings",
        href: "/admin/frontend-settings",
        icon: Settings2,
    },
    {
        title: "FAQ",
        href: "/admin/faq",
        icon: HelpCircle,
    },
    {
        title: "BLOGS",
        href: "/admin/blogs/list",
        icon: Ambulance,
        submenu: [
            { title: "List", href: "/admin/blogs/list" },
            { title: "Category", href: "/admin/blogs/category" },
        ],
    },
    {
        title: "Packages",
        href: "/admin/packages",
        icon: Calendar,
    },
    {
        title: "Complaints",
        href: "/admin/complains",
        icon: Megaphone,
    },
    {
        title: "Report",
        href: "/admin/reports",
        icon: BarChart3,
        submenu: [
            { title: "Overview", href: "/admin/reports" },
            { title: "Detailed Reports", href: "/admin/reports/detailed" },
            { title: "Financial Reports", href: "/admin/reports/financial" },
            { title: "Income Reports", href: "/admin/reports/income" },
            { title: "Member Reports", href: "/admin/reports/member" },
            { title: "Analytics", href: "/admin/reports/analytics" },
        ],
    },
    {
        title: "Marketing",
        href: "/admin/marketing/newsletter",
        icon: TrendingUp,
        submenu: [
            { title: "Newsletter", href: "/admin/marketing/newsletter" },
            { title: "Banners", href: "/admin/marketing/banners" },
        ],
    },
    {
        title: "Setting",
        href: "/admin/settings",
        icon: Settings,
        submenu: [
            { title: "General Settings", href: "/admin/settings" },
            { title: "Notifications", href: "/admin/settings/notifications" },
            { title: "Integrations", href: "/admin/settings/integrations" },
            { title: "Languages", href: "/admin/settings/languages" },
            { title: "Other Settings", href: "/admin/settings/other-settings" },
        ],
    },
    {
        title: "Staff",
        href: "/admin/staff",
        icon: UserCog,
        submenu: [
            { title: "All Staff", href: "/admin/staff" },
            { title: "Add Staff", href: "/admin/staff/add" },
            { title: "Roles & Permissions", href: "/admin/staff/roles" },
        ],
    },
    {
        title: "Chat & Video Setting",
        href: "/admin/video-setting",
        icon: Calendar,
    },
    {
        title: "Chat",
        href: "/admin/chat",
        icon: MessageCircle,
    },
    {
        title: "Support",
        href: "/admin/support",
        icon: HelpCircle,
    },
];