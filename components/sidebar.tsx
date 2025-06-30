"use client";
import {Button} from "@/components/ui/button";
import {useMobile} from "@/hooks/use-mobile";
import {cn} from "@/lib/utils";
import {
  Ambulance,
  BarChart3,
  Calendar,
  HelpCircle,
  LayoutDashboard,
  LucideHeart,
  Megaphone,
  MessageCircle,
  Settings, Settings2,
  TrendingUp,
  UserCog,
  UserRound,
  Users,
  X
} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import type React from "react";
import {useEffect, useState} from "react";
import AnimateHeight from "react-animate-height";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  submenu?: { title: string; href: string }[];
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const isMobile = useMobile();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const sidebarItems: SidebarItem[] = [
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
      href: "/blogs",
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
      href: "/marketing",
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
      href: "/chat-and-video-setting",
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
  ;

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(title);
    }
  };

  const sidebarClasses = cn("!fixed xl:top-16 !overflow-y-auto max-xl:h-full left-0 bottom-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out", {
    "translate-x-0": isOpen,
    "-translate-x-full": !isOpen && isMobile,
    "translate-x-0 ": isOpen && !isMobile,
  });
  useEffect(() => {
    const foundItem = sidebarItems.find((item) => {
      if (item.submenu) {
        return item.submenu.some((subItem) => pathname === subItem.href);
      }
      return pathname === item.href;
    });
    if (foundItem?.submenu) {
      setOpenSubmenu(foundItem.title);
    }
  }, []);
  return (
    <aside className={sidebarClasses}>
      {isMobile && (
        <div className="flex py-3 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <LucideHeart size={24} />
            <span className="font-bold inline-block">MedixPro</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="size-6" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
      )}
      <div className="flex-1 py-2  border-t">
        <nav className="space-y-1 px-2 ">
          {sidebarItems.map((item) => (
            <div key={item.title} className="space-y-1 custom-scrollbar">
              {item.submenu ? (
                <>
                  <button onClick={() => toggleSubmenu(item.title)} className={cn("flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors", item.href !== '/' && pathname.startsWith(item.href) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground", pathname=="/" && item.href=="/" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={cn("h-4 w-4 transition-transform", {
                        "rotate-180": openSubmenu === item.title,
                      })}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <AnimateHeight height={openSubmenu === item.title ? "auto" : 0}>
                    <div className="ml-4 space-y-1 pl-2 pt-1">
                      {item.submenu.map((subItem) => (
                        <Link key={subItem.title} href={subItem.href} className={cn("flex items-center rounded-md px-3 py-2 text-sm transition-colors", pathname === subItem.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")} onClick={() => isMobile && setIsOpen(false)}>
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </AnimateHeight>
                </>
              ) : (
                <Link href={item.href} className={cn("flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors", pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")} onClick={() => isMobile && setIsOpen(false)}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
