"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Building, Upload,} from "lucide-react"
import {useState} from "react"

export default function SettingsPage() {

  const [systemName, setSystemName] = useState("Humsafar")
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY")
  const [memberCodePrefix, setMemberCodePrefix] = useState("M")
  const [adminPageTitle, setAdminPageTitle] = useState("Amsterdam")
  const [adminPageParagraph, setAdminPageParagraph] = useState("")
  const [memberMinimumAge, setMemberMinimumAge] = useState("18")

  const dateFormatOptions = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY/MM/DD", "DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD"]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">General Settings</h2>
        <p className="text-sm text-muted-foreground">Configure your clinic settings and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-5 w-5" />
            System Information
          </CardTitle>
          <CardDescription>Update your clinic's basic information and contact details</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="system-name" className="text-base font-medium">
                  System Name
                </Label>
                <Input
                    id="system-name"
                    value={systemName}
                    onChange={(e) => setSystemName(e.target.value)}
                    placeholder="Enter system name"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Logo</h3>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 shrink-0 rounded-full bg-muted flex items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <input type="file" id="system-logo" className="hidden" />
                    <Button variant="outline" onClick={() => document.getElementById("system-logo")?.click()}>Upload Photo</Button>
                    <p className="text-sm text-muted-foreground">Upload a profile photo. JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-format" className="text-base font-medium">
                  Date Format
                </Label>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    {dateFormatOptions.map((format) => (
                        <SelectItem key={format} value={format}>
                          {format}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-page-title" className="text-base font-medium">
                  Admin Page Title
                </Label>
                <Input
                    id="admin-page-title"
                    value={adminPageTitle}
                    onChange={(e) => setAdminPageTitle(e.target.value)}
                    placeholder="Enter admin page title"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="member-code-prefix" className="text-base font-medium">
                  Member Code Prefix
                </Label>
                <Input
                    id="member-code-prefix"
                    value={memberCodePrefix}
                    onChange={(e) => setMemberCodePrefix(e.target.value)}
                    placeholder="Enter prefix"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Admin login page background</h3>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 shrink-0 rounded-sm bg-muted flex items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <input type="file" id="admin-bg" className="hidden" />
                    <Button variant="outline" onClick={() => document.getElementById("admin-bg")?.click()}>Upload Photo</Button>
                    <p className="text-sm text-muted-foreground">Upload a profile photo. JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="member-minimum-age" className="text-base font-medium">
                  Member Minimum Age
                </Label>
                <Input
                    id="member-minimum-age"
                    type="number"
                    value={memberMinimumAge}
                    onChange={(e) => setMemberMinimumAge(e.target.value)}
                    placeholder="Enter minimum age"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-page-paragraph" className="text-base font-medium">
                  Admin Page Paragraph
                </Label>
                <Textarea
                    id="admin-page-paragraph"
                    value={adminPageParagraph}
                    onChange={(e) => setAdminPageParagraph(e.target.value)}
                    placeholder="Enter admin page description"
                    rows={4}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button className="px-8">Save Configuration</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
