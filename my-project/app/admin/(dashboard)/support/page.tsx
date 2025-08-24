"use client"

import type React from "react"
import { SupportTicketList } from "@/components/admin/support/support-ticket-list";
import { useTranslation } from "react-i18next";

export default function SupportPage() {
  const { t } = useTranslation();

  return (
    <div className="container space-y-6 p-4 xl:p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{t("Help & Support")}</h1>
        <p className="text-muted-foreground">
          {t("Need assistance with your account, matches, or subscriptions? We&apos;re here to help you find love smoothly.")}
        </p>
      </div>

      <SupportTicketList />
    </div>
  )
}
