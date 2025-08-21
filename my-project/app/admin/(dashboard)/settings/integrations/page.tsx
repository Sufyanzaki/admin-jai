"use client"

import {ArrowLeft, Building} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/admin/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card";
import {Separator} from "@/components/admin/ui/separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/admin/ui/tabs";
import GoogleForm from "./_components/googleForm";
import FacebookForm from "./_components/facebookForm";
import StripeForm from "./_components/stripeForm";
import MollieForm from "./_components/mollieForm";
import CaptchaForm from "./_components/captchaForm";
import PushNotificationForm from "./_components/pushNotificationForm";
import SMTPForm from "./_components/smtpForm";
import {useSession} from "next-auth/react";

export default function IntegrationsPage() {
  const {data: session} = useSession();

  const permissionsMap = (session?.user.permissions ?? []).reduce((acc, perm) => {
    acc[perm.module] = {
      canCreate: perm.canCreate ?? true,
      canEdit: perm.canEdit ?? true,
      canDelete: perm.canDelete ?? true,
      canView: perm.canView ?? true,
    };
    return acc;
  }, {} as Record<string, { canCreate: boolean; canEdit: boolean; canDelete: boolean; canView: boolean }>);

  const socialMediaLogin = permissionsMap["social_media_login"];
  const thirdPartySettings = permissionsMap["third_party_settings"];
  const paymentMethods = permissionsMap["payment_methods"];
  const smtpSettings = permissionsMap["smtp_settings"];
  const pushNotification = permissionsMap["push_notification"];

  return (
      <div className="flex flex-col space-y-6 p-4 xl:p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href="/admin/settings">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h2 className="text-2xl font-bold tracking-tight">Integrations</h2>
          </div>
        </div>

        <Tabs defaultValue="social">
          <TabsList className="grid w-full grid-cols-4 sm:grid-cols-5 md:w-[600px]">
            {socialMediaLogin?.canView && <TabsTrigger value="social">Social</TabsTrigger>}
            {thirdPartySettings?.canView && <TabsTrigger value="third-party">Third Party</TabsTrigger>}
            {paymentMethods?.canView && <TabsTrigger value="settings">Payments</TabsTrigger>}
            {smtpSettings?.canView && <TabsTrigger value="smtp">SMTP</TabsTrigger>}
            {pushNotification?.canView && <TabsTrigger value="push-notification">Push Noti.</TabsTrigger>}
          </TabsList>

          {socialMediaLogin?.canView && (
              <TabsContent value="social" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="mr-2 h-5 w-5" />
                      Social Media Login
                    </CardTitle>
                    <CardDescription>Configure social media authentication providers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <GoogleForm canEdit={socialMediaLogin?.canEdit} />
                    <Separator />
                    <FacebookForm canEdit={socialMediaLogin?.canEdit} />
                  </CardContent>
                </Card>
              </TabsContent>
          )}

          {thirdPartySettings?.canView && (
              <TabsContent value="third-party" className="space-y-6 pt-4">
                <CaptchaForm canEdit={thirdPartySettings?.canEdit} />
              </TabsContent>
          )}

          {paymentMethods?.canView && (
              <TabsContent value="settings" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="mr-2 h-5 w-5" />
                      Payment Methods
                    </CardTitle>
                    <CardDescription>Configure your payment gateway settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <MollieForm canEdit={paymentMethods?.canEdit} />
                    <Separator />
                    <StripeForm canEdit={paymentMethods?.canEdit} />
                  </CardContent>
                </Card>
              </TabsContent>
          )}

          {smtpSettings?.canView && (
              <TabsContent value="smtp" className="space-y-6 pt-4">
                <SMTPForm canEdit={smtpSettings?.canEdit} />
              </TabsContent>
          )}

          {pushNotification?.canView && (
              <TabsContent value="push-notification" className="space-y-6 pt-4">
                <PushNotificationForm canEdit={pushNotification?.canEdit} />
              </TabsContent>
          )}
        </Tabs>
      </div>
  );
}
