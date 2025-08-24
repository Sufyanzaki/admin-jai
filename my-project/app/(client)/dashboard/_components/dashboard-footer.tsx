"use client"
import { useDashboardFooterSetting } from "@/app/admin/(dashboard)/settings/other-settings/_hooks/useDashboardFooterSetting";
import { Headphones, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function DashboardFooter() {
  const { t } = useTranslation();
  const { data: dashboardFooterData, isLoading: isLoadingDashboardFooterData } = useDashboardFooterSetting();
  const [sectionPageArray, setSectionPageArray] = useState<{ label: string; url: string }[]>([]);

  useEffect(() => {
    if (!dashboardFooterData?.data) return;

    const labels = dashboardFooterData.data.sectionPage.split(",").map((s: string) => s.trim());
    const urls = dashboardFooterData.data.pages.split(",").map((s: string) => s.trim());

    const combined = labels.map((label: string, index: number) => ({
      label,
      url: urls[index] || "#",
    }));

    setSectionPageArray(combined);
  }, [dashboardFooterData]);

  return (
      <footer className="bg-gray-100 border-t border-t-gray-300">
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left">

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-2 gap-y-1 text-xs text-gray-600 font-medium">
              {isLoadingDashboardFooterData ? (
                  <p>{t("Loading...")}</p>
              ) : (
                  sectionPageArray.map((link, idx) => (
                      <React.Fragment key={link.url}>
                        <Link href={link.url} className="hover:text-gray-900">
                          {t(link.label)}
                        </Link>
                        {idx !== sectionPageArray.length - 1 && (
                            <span className="text-gray-400 hidden sm:inline">•</span>
                        )}
                      </React.Fragment>
                  ))
              )}

              <Link href={"/dashboard/agenda"} className="hover:text-gray-900">{t("Agenda")}</Link>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <Link href={"/membership"} className="hover:text-gray-900">{t("Packages")}</Link>
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
  );
}
