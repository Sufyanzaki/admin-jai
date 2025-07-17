"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Building,
  Globe,
  Mail,
  Phone,
  Clock,
  Calendar,
  Languages,
  PaintBucket,
  Upload,
  Save,
  RefreshCcw,
  Shield,
  Lock,
  Key,
  FileJson,
  Database,
  HardDrive, Settings,
} from "lucide-react"
import {SimpleEditor} from "@/components/tiptap-templates/simple/simple-editor";
import CookiesForm from "./_components/cookies-form"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div>
        <h2 className="text-2xl font-bold">General Settings</h2>
        <p className="text-sm text-muted-foreground">Configure your clinic settings and preferences</p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="cookies">Cookies</TabsTrigger>
          <TabsTrigger value="seo-settings">SEO Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                System Configuration
              </CardTitle>
              <CardDescription>Manage your system settings and appearance</CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* System Identity */}
                    <div className="space-y-4 rounded-lg border p-4">
                      <h3 className="text-lg font-semibold">System Identity</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="system-name">System Name</Label>
                          <Input
                              id="system-name"
                              placeholder="Your System Name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>System Logo</Label>
                          <div className="flex items-center gap-4">
                            <div className="h-24 w-24 rounded-lg border flex items-center justify-center bg-muted/50">
                              <Upload className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => document.getElementById('system-logo')?.click()}
                                >
                                  Upload Logo
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Recommended: 300×300px PNG with transparent background
                              </p>
                              <input
                                  type="file"
                                  id="system-logo"
                                  className="hidden"
                                  accept="image/*"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date & Admin Settings */}
                    <div className="space-y-4 rounded-lg border p-4">
                      <h3 className="text-lg font-semibold">Format Settings</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="date-format">Date Format</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="test">
                                Test Me
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="admin-page-title">Admin Panel Title</Label>
                          <Input
                              id="admin-page-title"
                              placeholder="Admin Dashboard"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Member Settings */}
                    <div className="space-y-4 rounded-lg border p-4">
                      <h3 className="text-lg font-semibold">Member Settings</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="member-code-prefix">Member ID Prefix</Label>
                          <Input
                              id="member-code-prefix"
                              placeholder="MEM-"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="member-minimum-age">Minimum Age Requirement</Label>
                          <div className="flex items-center gap-2">
                            <Input
                                id="member-minimum-age"
                                type="number"
                                min="18"
                                max="100"
                                className="w-24"
                            />
                            <span className="text-sm text-muted-foreground">years</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Admin Appearance */}
                    <div className="space-y-4 rounded-lg border p-4">
                      <h3 className="text-lg font-semibold">Admin Appearance</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Login Background</Label>
                          <div className="flex items-center gap-4">
                            <div className="flex-1 space-y-2">
                              <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => document.getElementById('admin-bg')?.click()}
                                >
                                  Upload Background
                                </Button>

                              </div>
                              <p className="text-xs text-muted-foreground">
                                Recommended: 1920×1080px JPG/PNG
                              </p>
                              <input
                                  type="file"
                                  id="admin-bg"
                                  className="hidden"
                                  accept="image/*"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="admin-page-paragraph">Welcome Message</Label>
                          <Textarea
                              id="admin-page-paragraph"
                              placeholder="Welcome to the admin panel..."
                              rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Configuration
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Preferences
              </CardTitle>
              <CardDescription>Update your clinic's basic information and contact details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="use-insurance">Maintenance Mode Activation</Label>
                <Switch id="use-insurance" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="default-currency">Default Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD – US Dollar</SelectItem>
                    <SelectItem value="eur">EUR – Euro</SelectItem>
                    <SelectItem value="gbp">GBP – British Pound</SelectItem>
                    <SelectItem value="cad">CAD – Canadian Dollar</SelectItem>
                    <SelectItem value="pkr">PKR – Pakistani Rupee</SelectItem>
                    <SelectItem value="inr">INR – Indian Rupee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="default-language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="ur">Urdu</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>


              <div className="flex justify-end pt-6">
                <Button className="px-8">Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                System Settings
              </CardTitle>
              <CardDescription>
                Overview of your server configuration and PHP settings.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Server Information */}
              <div className="border rounded-xl p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Server Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>- PHP Version</span>
                    <span>8.3.21</span>
                  </div>
                  <div className="flex justify-between">
                    <span>- MySQL Version</span>
                    <span>10.6.22-MariaDB</span>
                  </div>
                </div>
              </div>

              {/* PHP.ini Config */}
              <div className="border rounded-xl p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">php.ini Config</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>- File Uploads</span>
                    <span>Enabled</span>
                  </div>
                  <div className="flex justify-between">
                    <span>- Max File Uploads</span>
                    <span>20</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cookies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Cookies
              </CardTitle>
              <CardDescription>Update your cookies basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">

              <CookiesForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="seo-settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                SEO Settings
              </CardTitle>
              <CardDescription>
                Manage meta titles, descriptions, and keywords to improve your app’s visibility in search engines.
              </CardDescription>
            </CardHeader>


            
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
