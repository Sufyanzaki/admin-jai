"use client"

import { Headphones, MessageCircle, Phone } from "lucide-react"
import Link from "next/link"

export function DashboardFooter() {
  return (
    <footer className="bg-gray-100 border-t border-t-gray-300">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-2 gap-y-1 text-xs text-gray-600 font-medium">
            <Link href="/dashboard/agenda" className="hover:text-gray-900">Dating Tips</Link>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <Link href="/dashboard/agenda" className="hover:text-gray-900">Events</Link>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <Link href="/dashboard/help" className="hover:text-gray-900">Help</Link>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <Link href="/auth/profile/membership" className="hover:text-gray-900">Packages</Link>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <Link href="/dashboard/agenda" className="hover:text-gray-900">Safety Tips</Link>
          </div>

          <div className="flex justify-center md:justify-end items-center gap-2">
            <Link href="#">
              <Headphones className="w-4 h-4" />
            </Link>
            <Link href="#">
              <MessageCircle className="w-4 h-4" />
            </Link>
            <Link href="#">
              <Phone className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
