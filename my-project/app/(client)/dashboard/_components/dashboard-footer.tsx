"use client"
import { useDashboardFooterSetting } from "@/app/admin/(dashboard)/settings/other-settings/_hooks/useDashboardFooterSetting";
import { Headphones, MessageCircle, Phone } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react";

export function DashboardFooter() {
  const { data: dashboardFooterData, isLoading: isLoadingDashboardFooterData } = useDashboardFooterSetting();
  const [sectionPageArray, setSectionPageArray] = useState()

  useEffect(() => {
    if (dashboardFooterData?.sectionPage) {
      // Convert comma-separated string to array
      setSectionPageArray(dashboardFooterData.sectionPage.split(',').map(page => page.trim()));
    }
  }, [dashboardFooterData]);
  console.log(sectionPageArray)

  return (
    <footer className="bg-gray-100 border-t border-t-gray-300">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-2 gap-y-1 text-xs text-gray-600 font-medium">
            {isLoadingDashboardFooterData ?
              <p>Loading...</p>
              : sectionPageArray?.map((link) => (
                <React.Fragment key={link}>
                  <Link href={`/dashboard/${encodeURIComponent(link)}`} className="hover:text-gray-900">
                    {link}
                  </Link>
                  <span className="text-gray-400 hidden sm:inline">•</span>
                </React.Fragment>
              ))
            }
            <Link href={"/dashboard/agenda"} className="hover:text-gray-900">Agenda</Link>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <Link href={"/dashboard/packages"} className="hover:text-gray-900">Packages</Link>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <Link href={"/dashboard/safety-tips"} className="hover:text-gray-900">Safety Tips</Link>
            <span className="text-gray-400 hidden sm:inline">•</span>



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
