"use client"

import type React from "react"
import {SupportTicketList} from "@/components/support/support-ticket-list";

export default function SupportPage() {

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Support Center</h1>
        <p className="text-muted-foreground">Get help with your clinic management system or submit a support ticket.</p>
      </div>

      <SupportTicketList />
    </div>
  )
}
