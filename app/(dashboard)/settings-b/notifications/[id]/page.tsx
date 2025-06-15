"use client"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ArrowLeft, Mail,} from "lucide-react"
import Link from "next/link"
import TipTapEditor from "@/components/editor/TipTapEditor"
import {Switch} from "@/components/ui/switch";

export default function NotificationsDetailsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="outline" size="icon" asChild className="h-8 w-8">
          <Link href="/settings">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Notification Settings</h1>
          <p className="text-sm text-muted-foreground">Configure email, SMS, and in-app notifications</p>
        </div>
      </div>

      <div className="">
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Welcome Email</CardTitle>
            <Mail className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <form className="space-y-8">
              <div className="space-y-6 rounded-lg border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="template-status" className="text-base">Template Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable this email template
                    </p>
                  </div>
                  <Switch id="template-status" defaultChecked />
                </div>

                {/* Subject Line */}
                <div className="space-y-2">
                  <Label htmlFor="email-subject" className="text-base">Email Subject</Label>
                  <Input
                      id="email-subject"
                      placeholder="e.g., Welcome to Our Platform"
                      className="text-base py-2 h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-content" className="text-base">Email Content</Label>
                  <TipTapEditor />
                  <p className="text-sm text-muted-foreground">
                    Use the toolbar to format your email content
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="submit" className="px-8">
                  Save Template
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
