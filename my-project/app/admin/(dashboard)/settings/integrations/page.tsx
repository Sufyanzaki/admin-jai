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

  // If admin, allow all tabs and editing
  const socialMediaLogin = isAdmin ? { canView: true, canEdit: true } : permissionsMap["social_media_login"];
  const thirdPartySettings = isAdmin ? { canView: true, canEdit: true } : permissionsMap["third_party_settings"];
  const paymentMethods = isAdmin ? { canView: true, canEdit: true } : permissionsMap["payment_methods"];
  const smtpSettings = isAdmin ? { canView: true, canEdit: true } : permissionsMap["smtp_settings"];
  const pushNotification = isAdmin ? { canView: true, canEdit: true } : permissionsMap["push_notification"];

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
            {(isAdmin || socialMediaLogin?.canView) && <TabsTrigger value="social">Social</TabsTrigger>}
            {(isAdmin || thirdPartySettings?.canView) && <TabsTrigger value="third-party">Third Party</TabsTrigger>}
            {(isAdmin || paymentMethods?.canView) && <TabsTrigger value="settings">Payments</TabsTrigger>}
            {(isAdmin || smtpSettings?.canView) && <TabsTrigger value="smtp">SMTP</TabsTrigger>}
            {(isAdmin || pushNotification?.canView) && <TabsTrigger value="push-notification">Push Noti.</TabsTrigger>}
          </TabsList>

          {(isAdmin || socialMediaLogin?.canView) && (
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
                    <GoogleForm canEdit={isAdmin || socialMediaLogin?.canEdit} />
                    <Separator />
                    <FacebookForm canEdit={isAdmin || socialMediaLogin?.canEdit} />
                  </CardContent>
                </Card>
              </TabsContent>
          )}

          {(isAdmin || thirdPartySettings?.canView) && (
              <TabsContent value="third-party" className="space-y-6 pt-4">
                <CaptchaForm canEdit={isAdmin || thirdPartySettings?.canEdit} />
              </TabsContent>
          )}

          {(isAdmin || paymentMethods?.canView) && (
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
                    <MollieForm canEdit={isAdmin || paymentMethods?.canEdit} />
                    <Separator />
                    <StripeForm canEdit={isAdmin || paymentMethods?.canEdit} />
                  </CardContent>
                </Card>
              </TabsContent>
          )}

          {(isAdmin || smtpSettings?.canView) && (
              <TabsContent value="smtp" className="space-y-6 pt-4">
                <SMTPForm canEdit={isAdmin || smtpSettings?.canEdit} />
              </TabsContent>
          )}

          {(isAdmin || pushNotification?.canView) && (
              <TabsContent value="push-notification" className="space-y-6 pt-4">
                <PushNotificationForm canEdit={isAdmin || pushNotification?.canEdit} />
              </TabsContent>
          )}
        </Tabs>
      </div>
  );
}
