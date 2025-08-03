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
import SEOForm from "@/app/(dashboard)/settings/_components/SEO-form";
import BasicSettingsForm from "./_components/basic-settings-form"
import PreferenceForm from "./_components/preference-form"

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
          <BasicSettingsForm />
        </TabsContent>
        <TabsContent value="preferences" className="space-y-4">
          <PreferenceForm />
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
            <SEOForm />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
