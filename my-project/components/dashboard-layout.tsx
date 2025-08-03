"use client"
import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { UserNav } from "@/components/user-nav"
import {useLaptop, useMobile} from "@/hooks/use-mobile"
import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {ChevronLeft, Menu} from 'lucide-react'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useLaptop()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(true);
      setIsCollapsed(false);
    } else {
      setIsSidebarOpen(false);
      setIsCollapsed(false);
    }
  }, [isMobile])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth < 1200 && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const getContentMargin = () => {
    if (isMobile) return "ml-0"
    if (!isSidebarOpen) return "ml-0"
    if (isCollapsed) return "xl:ml-16"
    return "xl:ml-64"
  }

  const contentMarginClass = getContentMargin()

  return (
      <div className="flex min-h-screen flex-col dark:bg-[#131212]">
        <header
            className={cn(
                "sticky top-0 z-30 border-b bg-background transition-all duration-300 ease-in-out",
                contentMarginClass,
            )}
        >
          <div className="flex h-16 items-center justify-between px-4 xl:px-6">
            <div className="flex items-center gap-4">
              <button className="xl:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <Menu className="size-6" />
                <span className="sr-only">Toggle sidebar</span>
              </button>
              <Button variant="ghost" size="icon" onClick={()=>setIsCollapsed(!isCollapsed)} className="hidden xl:inline-flex">
                <ChevronLeft className="size-4" />
                <span className="sr-only">Collapse sidebar</span>
              </Button>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </header>

        <div className="flex flex-1 items-start">
          <div ref={sidebarRef}>
            <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
          </div>

          <main className={cn("flex-1 overflow-auto transition-all duration-300 ease-in-out", contentMarginClass)}>
            {children}
          </main>
        </div>

        {isMobile && isSidebarOpen && (
            <div className="fixed inset-0 z-20 xl:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}
      </div>
  )
}
