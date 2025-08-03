"use client"

import type React from "react"
import {SupportTicketList} from "@/components/support/support-ticket-list";

export default function SupportPage() {

  return (
    <div className="container space-y-6 p-4 xl:p-6">
        <div className="flex flex-col space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Help & Support</h1>
            <p className="text-muted-foreground">
                Need assistance with your account, matches, or subscriptions? We're here to help you find love smoothly.
            </p>
        </div>

      <SupportTicketList />
    </div>
  )
}
