"use client"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/admin/ui/tabs"
import {Settings} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card";
import AbusiveCard from "./_components/abusive-card";
import CurrencyTable from "./_components/currency-table";
import UserDashboardFooterForm from "./_components/user-dashboard-footer-form";
import FooterSettingsTable from "./_components/footer-settings-table";
import FooterForm from "./_components/footerForm";
import {useSession} from "next-auth/react";
import {superUser} from "@/lib/utils";

export default function SettingsPage() {
  const { data: session } = useSession();

  const permissionsArr = session?.user.permissions ?? [];
  const isAdmin = permissionsArr.length === 0;

  const permissionsMap = (session?.user.permissions ?? []).reduce((acc, perm) => {
    acc[perm.module] = {
      canCreate: perm.canCreate ?? true,
      canEdit: perm.canEdit ?? true,
      canDelete: perm.canDelete ?? true,
      canView: perm.canView ?? true,
    };
    return acc;
  }, {} as Record<string, { canCreate: boolean; canEdit: boolean; canDelete: boolean; canView: boolean }>);

  const currency = isAdmin ? superUser: permissionsMap["currency"];
  const abuseWordFiltering = isAdmin ? superUser : permissionsMap["abuse_word_filtering"];
  const footer = isAdmin ? superUser : permissionsMap["footer"];
  const footerSection = isAdmin ? superUser : permissionsMap["footer_section"];

  return (
      <div className="flex flex-col gap-6 p-4 xl:p-6">
        <div>
          <h2 className="text-2xl font-bold">App Settings</h2>
          <p className="text-sm text-muted-foreground">Configure your app settings and preferences</p>
        </div>

        <Tabs defaultValue="currency" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            {currency?.canView && <TabsTrigger value="currency">Currency</TabsTrigger>}
            {abuseWordFiltering?.canView && <TabsTrigger value="abusive-words">Abusive Words</TabsTrigger>}
            {footer?.canView && <TabsTrigger value="footer">Footer</TabsTrigger>}
            {footerSection?.canView && <TabsTrigger value="footer-settings">Footer Section</TabsTrigger>}
            {footerSection?.canView && <TabsTrigger value="user-dashboard">User Dashboard</TabsTrigger>}
          </TabsList>

          {currency?.canView && (
              <TabsContent value="currency" className="space-y-4">
                <CurrencyTable canEdit={currency.canEdit} canCreate={currency.canCreate} canDelete={currency.canDelete} />
              </TabsContent>
          )}

          {abuseWordFiltering?.canView && (
              <TabsContent value="abusive-words" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Settings className="h-5 w-5" />
                          Abusive Words Configuration
                        </CardTitle>
                        <CardDescription>Manage abusive word filtering</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <AbusiveCard canEdit={abuseWordFiltering?.canEdit} canDelete={abuseWordFiltering?.canEdit} canCreate={abuseWordFiltering?.canCreate} />
                </Card>
              </TabsContent>
          )}

          {footer?.canView && (
              <TabsContent value="footer" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Settings className="h-5 w-5" />
                          Footer
                        </CardTitle>
                        <CardDescription>Manage footer content</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FooterForm canEdit={footer?.canEdit} />
                  </CardContent>
                </Card>
              </TabsContent>
          )}

          {footerSection?.canView && (
              <TabsContent value="footer-settings" className="space-y-4">
                <FooterSettingsTable
                    canEdit={footerSection?.canEdit}
                    canDelete={footerSection?.canDelete}
                    canCreate={footerSection?.canCreate}
                />
              </TabsContent>
          )}

          {footerSection?.canView && (
              <TabsContent value="user-dashboard" className="space-y-4">
                <UserDashboardFooterForm canEdit={footerSection?.canEdit} />
              </TabsContent>
          )}
        </Tabs>
      </div>
  )
}
