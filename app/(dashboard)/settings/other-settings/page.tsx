"use client"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">General Settings</h2>
        <p className="text-sm text-muted-foreground">Configure your clinic settings and preferences</p>
      </div>

      <Tabs defaultValue="clinic" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="currency">Currency</TabsTrigger>
          <TabsTrigger value="abusive-words">Abusive Words</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="seo-settings">Footer Section</TabsTrigger>
          <TabsTrigger value="user-dashboard">User Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="currency" className="space-y-4">

        </TabsContent>
        <TabsContent value="abusive-words" className="space-y-4">

        </TabsContent>
        <TabsContent value="footer" className="space-y-4">

        </TabsContent>
        <TabsContent value="seo-settings" className="space-y-4">

        </TabsContent>
        <TabsContent value="user-dashboard" className="space-y-4">

        </TabsContent>
      </Tabs>
    </div>
  )
}
