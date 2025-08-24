"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/admin/ui/tabs"
import {Building} from "lucide-react"
import CookiesForm from "./_components/cookies-form"
import SEOForm from "@/app/admin/(dashboard)/settings/_components/SEO-form";
import BasicSettingsForm from "./_components/basic-settings-form"
import PreferenceForm from "./_components/preference-form"
import {useSession} from "next-auth/react";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { t } = useTranslation();
  const { data: session } = useSession();

  const permissionsArr = session?.user.permissions ?? [];
  const isAdmin = permissionsArr.length === 0;

  const permissionsMap = permissionsArr.reduce((acc, perm) => {
    acc[perm.module] = {
      canCreate: perm.canCreate ?? true,
      canEdit: perm.canEdit ?? true,
      canDelete: perm.canDelete ?? true,
      canView: perm.canView ?? true,
    };
    return acc;
  }, {} as Record<string, { canCreate: boolean; canEdit: boolean; canDelete: boolean; canView: boolean }>);

  // If admin, allow all tabs
  const generalSettings = isAdmin ? { canView: true, canEdit: true } : permissionsMap["general_settings"];
  const preferences = isAdmin ? { canView: true, canEdit: true } : permissionsMap["preferences"];
  const system = isAdmin ? { canView: true, canEdit: true } : permissionsMap["system"];
  const cookie = isAdmin ? { canView: true, canEdit: true } : permissionsMap["cookie"];
  const seoSettings = isAdmin ? { canView: true, canEdit: true } : permissionsMap["seo_settings"];

  return (
      <div className="flex flex-col gap-6 p-4 xl:p-6">
        <div>
          <h2 className="text-2xl font-bold">{t("General Settings")}</h2>
          <p className="text-sm text-muted-foreground">{t("Configure your cookie settings and preferences")}</p>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            {(isAdmin || generalSettings?.canView) && <TabsTrigger value="basic">{t("Basic")}</TabsTrigger>}
            {(isAdmin || preferences?.canView) && <TabsTrigger value="preferences">{t("Preferences")}</TabsTrigger>}
            {(isAdmin || system?.canView) && <TabsTrigger value="system">{t("System")}</TabsTrigger>}
            {(isAdmin || cookie?.canView) && <TabsTrigger value="cookies">{t("Cookies")}</TabsTrigger>}
            {(isAdmin || seoSettings?.canView) && <TabsTrigger value="seo-settings">{t("SEO Settings")}</TabsTrigger>}
          </TabsList>

          {(isAdmin || generalSettings?.canView) && (
              <TabsContent value="basic" className="space-y-4">
                <BasicSettingsForm canEdit={isAdmin || generalSettings?.canEdit} />
              </TabsContent>
          )}

          {(isAdmin || preferences?.canView) && (
              <TabsContent value="preferences" className="space-y-4">
                <PreferenceForm canEdit={isAdmin || preferences?.canEdit} />
              </TabsContent>
          )}

          {(isAdmin || system?.canView) && (
              <TabsContent value="system" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="mr-2 h-5 w-5" />
                      {t("System Settings")}
                    </CardTitle>
                    <CardDescription>
                      {t("Overview of your server configuration and PHP settings.")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border rounded-xl p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">{t("Server Information")}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>{t("- Node.js Version")}</span>
                          <span>{t("v20.11.1")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t("- NPM Version")}</span>
                          <span>{t("10.5.0")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t("- Next.js Version")}</span>
                          <span>{t("14.2.4")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t("- Express.js Version")}</span>
                          <span>{t("4.19.2")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t("- Database")}</span>
                          <span>{t("PostgreSQL 15.4")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-xl p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">{t("App Config")}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>{t("- Environment")}</span>
                          <span>{t("Production")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t("- Port")}</span>
                          <span>{t("3000")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t("- Build Mode")}</span>
                          <span>{t("Server / Static Hybrid")}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
          )}

          {(isAdmin || cookie?.canView) && (
              <TabsContent value="cookies" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="mr-2 h-5 w-5" />
                      {t("Cookies")}
                    </CardTitle>
                    <CardDescription>{t("Update your cookies basic information")}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CookiesForm canEdit={isAdmin || cookie?.canEdit} />
                  </CardContent>
                </Card>
              </TabsContent>
          )}

          {(isAdmin || seoSettings?.canView) && (
              <TabsContent value="seo-settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="mr-2 h-5 w-5" />
                      {t("SEO Settings")}
                    </CardTitle>
                    <CardDescription>
                      {t("Manage meta titles, descriptions, and keywords to improve your app’s visibility in search engines.")}
                    </CardDescription>
                  </CardHeader>
                  <SEOForm canEdit={isAdmin || seoSettings?.canEdit} />
                </Card>
              </TabsContent>
          )}
        </Tabs>
      </div>
  )
}
