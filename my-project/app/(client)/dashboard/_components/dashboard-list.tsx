export function DashboardList() {
    const menuItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Search", href: "/dashboard/search" },
        { label: "My Visits", href: "/dashboard/visits" },
        { label: "Matches", href: "/dashboard/matches", badge: 8, badgeColor: "bg-app-light-pink" },
        { label: "Notification", href: "/dashboard/notifications/received" },
        { label: "Messages", href: "/dashboard/chat", badge: 3, badgeColor: "bg-cyan-500" },
        { label: "My Profile", href: "/dashboard/settings/account" }
    ];

    return (
        <div className="h-full flex px-8">
            <div className="w-full py-8 bg-white relative">
                <nav className="mt-12">
                    <ul className="space-y-6">
                        {menuItems.map(({ label, href, badge, badgeColor }) => (
                            <li key={label} className="flex items-center justify-between">
                                <a
                                    href={href}
                                    className="text-lg font-medium text-black hover:text-app-pink transition-colors"
                                >
                                    {label}
                                </a>
                                {badge !== undefined && (
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full text-white ${badgeColor}`}
                                    >
                                        {badge}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
