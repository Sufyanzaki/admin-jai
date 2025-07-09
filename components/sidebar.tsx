"use client"
import {useEffect, useState} from "react"
import {usePathname} from "next/navigation"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import {Heart, X} from "lucide-react"
import {cn} from "@/lib/utils"
import {useLaptop} from "@/hooks/use-mobile"
import AnimateHeight from "react-animate-height"
import {useTheme} from "next-themes";
import Image from "next/image";
import {sidebarItems} from "@/constant/sideOptions"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void;
  isCollapsed?: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

export function Sidebar({ isOpen, setIsOpen, isCollapsed = false }: SidebarProps) {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const {theme} = useTheme();

  // Update useMobile hook to use xl breakpoint (1200px) instead of md
  const isMobile = useLaptop();

  const navigationItems = sidebarItems.slice(0, -1)
  const footerItem = sidebarItems[sidebarItems.length - 1]

  const toggleSubmenu = (title: string) => {
    if (isCollapsed) return

    if (openSubmenu === title) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(title)
    }
  }

    const sidebarClasses = cn(
        "fixed top-0 h-full left-0 z-40 flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
        {
            "-translate-x-full": isMobile && !isOpen,
            "translate-x-0": !isMobile || (isMobile && isOpen),
            "w-64": isMobile || (!isMobile && !isCollapsed),
            "w-16": !isMobile && isCollapsed,
        }
    );


    useEffect(() => {
    if (isCollapsed) return

    const foundItem = navigationItems.find((item) => {
      if (item.submenu) {
        return item.submenu.some((subItem) => pathname === subItem.href)
      }
      return pathname === item.href
    })
    if (foundItem?.submenu) {
      setOpenSubmenu(foundItem.title)
    }
  }, [isCollapsed, pathname])

  const renderMenuItem = (item: any) => {
    const isActive = (item.href !== "/" && pathname.startsWith(item.href)) ||
        (pathname === "/" && item.href === "/")
    const hasSubmenu = item.submenu && !isCollapsed && !isMobile

    if (isCollapsed && !isMobile) {
      return (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Link
                  href={item.href}
                  className={cn(
                      "flex items-center justify-center rounded-md p-3 text-sm font-medium transition-colors",
                      isActive ? "bg-primary/10 text-primary" : "hover:bg-muted hover:text-foreground",
                  )}
                  onClick={() => isMobile && setIsOpen(false)}
              >
                <item.icon className="h-4 w-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" align="center" sideOffset={8} className="z-50">
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
      )
    }

    return (
        <div key={item.title} className="space-y-1">
          {hasSubmenu ? (
              <>
                <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                        "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted hover:text-foreground",
                    )}
                >
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
                    {item.submenu.map((subItem: any) => (
                        <Link
                            key={subItem.title}
                            href={subItem.href}
                            className={cn(
                                "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                                pathname === subItem.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-dark hover:bg-muted hover:text-foreground",
                            )}
                            onClick={() => isMobile && setIsOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                    ))}
                  </div>
                </AnimateHeight>
              </>
          ) : (
              <Link
                  href={item.href}
                  className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "bg-primary/10 text-primary" : "hover:bg-muted hover:text-foreground",
                  )}
                  onClick={() => isMobile && setIsOpen(false)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {!isCollapsed && item.title}
              </Link>
          )}
        </div>
    )
  }

  return (
      <TooltipProvider delayDuration={300}>
        <aside className={sidebarClasses}>
          <div className="flex items-center justify-between p-4 border-b h-16">
            {(!isCollapsed || isMobile) ? (
                <>
                  <Link href="/">
                    <Image
                        src={theme === "dark"
                            ? "https://ticketprijs.nl/admin/logoImages/1730182765_logo%20(1).png"
                            : "https://ticketprijs.nl/admin/Image/AppSettings/Logo/1730289473_1730098174_1727434463_logo-alt.png"}
                        alt="Humsafar"
                        width={127}
                        height={36}
                    />
                  </Link>
                  {isMobile && (
                      <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
                        <X className="w-6 h-6"/>
                      </Button>
                  )}
                </>
            ) : <Link href="/">
                <Heart className="w-6 h-6" />
            </Link>}
          </div>

          <div className="flex-1 py-2 overflow-y-auto">
            <nav className="space-y-1 px-2">
              {navigationItems.map((item) => renderMenuItem(item))}
            </nav>
          </div>

          {footerItem && (
              <div className="border-t p-2">
                {renderMenuItem(footerItem)}
              </div>
          )}
        </aside>
      </TooltipProvider>
  )
}