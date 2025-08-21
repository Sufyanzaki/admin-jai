import {
    Ambulance,
    BarChart3,
    Calendar,
    HelpCircle,
    LayoutDashboard,
    Settings,
    Settings2,
    TrendingUp,
    UserCog,
    UserRound,
    Users
} from "lucide-react";

export const sidebarItems = [
    {
        title: "Dashboard",
        module: "dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Members",
        module: "members",
        href: "/admin/members",
        icon: Users,
    },
    {
        title: "Profile Attributes",
        module: "profile_attributes",
        href: "/admin/profile-attributes",
        icon: Calendar,
    },
    {
        title: "Payments",
        module: "payments",
        href: "/admin/payments",
        icon: UserRound,
    },
    {
        title: "Frontend Settings",
        module: "frontend_settings",
        href: "/admin/frontend-settings",
        icon: Settings2,
    },
    {
        title: "FAQ",
        module: "faqs",
        href: "/admin/faq",
        icon: HelpCircle,
    },
    {
        title: "BLOGS",
        module: "blogs",
        href: "/admin/blogs/list",
        icon: Ambulance,
        submenu: [
            { title: "List", module: "blogs", href: "/admin/blogs/list" },
            { title: "Category", module: "blogs_category", href: "/admin/blogs/category" },
        ],
    },
    {
        title: "Packages",
        module: "packages",
        href: "/admin/packages",
        icon: Calendar,
    },
    // {
    //     title: "Complaints",
    //     module: "complaints",
    //     href: "/admin/complains",
    //     icon: Megaphone,
    // },
    {
        title: "Report",
        module: "",
        href: "/admin/reports",
        icon: BarChart3,
        submenu: [
            { title: "Overview", module: "", href: "/admin/reports" },
            { title: "Detailed Reports", module: "detail_report", href: "/admin/reports/detailed" },
            { title: "Financial Reports", module: "financial_report", href: "/admin/reports/financial" },
            { title: "Income Reports", module: "income_report", href: "/admin/reports/income" },
            { title: "Member Reports", module: "member_report", href: "/admin/reports/member" },
            { title: "Analytics", module: "analytic", href: "/admin/reports/analytics" },
        ],
    },
    {
        title: "Marketing",
        module: "",
        href: "/admin/marketing/newsletter",
        icon: TrendingUp,
        submenu: [
            { title: "Newsletter", module: "newsletter", href: "/admin/marketing/newsletter" },
            { title: "Banners", module: "banners", href: "/admin/marketing/banners" },
        ],
    },
    {
        title: "Setting",
        module: "",
        href: "/admin/settings",
        icon: Settings,
        submenu: [
            { title: "General Settings", module: "general_settings", href: "/admin/settings" },
            { title: "Notifications", module: "push_notification", href: "/admin/settings/notifications" },
            { title: "Integrations", module: "third_party_settings", href: "/admin/settings/integrations" },
            { title: "Languages", module: "language", href: "/admin/settings/languages" },
            { title: "Other Settings", module: "preferences", href: "/admin/settings/other-settings" },
        ],
    },
    {
        title: "Staff",
        module: "staffs",
        href: "/admin/staff",
        icon: UserCog,
        submenu: [
            { title: "All Staff", module: "staffs", href: "/admin/staff"},
            { title: "Roles & Permissions", module: "", href: "/admin/staff/roles"},
        ],
    },
    {
        title: "Chat & Video Setting",
        module: "",
        href: "/admin/video-setting",
        icon: Calendar,
    },
    {
        title: "Support",
        module: "",
        href: "/admin/support",
        icon: HelpCircle,
    },
];