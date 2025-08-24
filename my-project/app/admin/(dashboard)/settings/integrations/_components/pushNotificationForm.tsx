"use client"

import { Alert, AlertDescription } from "@/components/admin/ui/alert";
import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Separator } from "@/components/admin/ui/separator";
import { Switch } from "@/components/admin/ui/switch";
import { Building } from "lucide-react";
import { Controller } from "react-hook-form";
import usePushForm from "../_hooks/usePushForm";
import Preloader from "@/components/shared/Preloader";
import { useTranslation } from "react-i18next";

const firebaseInstructions = [
  "Log in to Google Firebase and Create a new app if you don’t have any.",
  "Go to Project Settings and select General tab.",
  "Select Config and you will find Firebase Config Credentials.",
  "Copy your App’s Credentials and paste the Credentials into appropriate fields.",
  "Now, select Cloud Messaging tab and Enable Cloud Messaging API.",
  "After enabling Cloud Messaging API, you will find Server Key. Copy the key value and paste into FIREBASE SERVER KEY field.",
  'Configure the "firebase-messaging-sw.js" file and keep the file in the root directory of your cPanel.'
];

export default function PushNotificationForm({canEdit}: { canEdit: boolean}) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    isLoadingData,
    control,
  } = usePushForm();

  if (isLoadingData) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader/>
          <p className="text-sm">{t("Loading push notification settings")}</p>
        </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-5 w-5" />
            {t("Push Notifications")}
          </CardTitle>
          <CardDescription>{t("Configure Firebase Cloud Messaging (FCM) settings")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Settings Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t("Firebase Configuration")}</h3>

            <div className="flex items-center justify-between pb-4">
              <div>
                <Label htmlFor="push-status">{t("Activation")}</Label>
                <p className="text-xs text-muted-foreground">
                  {t("Enable/disable push notifications service")}
                </p>
              </div>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="push-status"
                    checked={field.value}
                    disabled={!canEdit}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fcm-api-key">{t("FCM API KEY")}</Label>
                <Input
                  id="fcm-api-key"
                  type="password"
                  placeholder={t("Enter FCM API Key")}
                  {...register('fcmApiKey')}
                    disabled={!canEdit}
                />
                {errors.fcmApiKey && (
                  <p className="text-sm text-red-500">{errors.fcmApiKey.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fcm-auth-domain">{t("FCM AUTH DOMAIN")}</Label>
                <Input
                  id="fcm-auth-domain"
                  placeholder={t("Enter Auth Domain")}
                  {...register('authDomain')}
                    disabled={!canEdit}
                />
                {errors.authDomain && (
                  <p className="text-sm text-red-500">{errors.authDomain.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fcm-project-id">{t("FCM PROJECT ID")}</Label>
                <Input
                  id="fcm-project-id"
                  placeholder={t("Enter Project ID")}
                  {...register('projectId')}
                    disabled={!canEdit}
                />
                {errors.projectId && (
                  <p className="text-sm text-red-500">{errors.projectId.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fcm-storage-bucket">{t("FCM STORAGE BUCKET")}</Label>
                <Input
                  id="fcm-storage-bucket"
                  placeholder={t("Enter Storage Bucket")}
                  disabled={!canEdit}
                  {...register('storageBucket')}
                />
                {errors.storageBucket && (
                  <p className="text-sm text-red-500">{errors.storageBucket.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fcm-sender-id">{t("FCM MESSAGING SENDER ID")}</Label>
                <Input
                  id="fcm-sender-id"
                  placeholder={t("Enter Sender ID")}
                  disabled={!canEdit}
                  {...register('messagingSenderId')}
                />
                {errors.messagingSenderId && (
                  <p className="text-sm text-red-500">{errors.messagingSenderId.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fcm-app-id">{t("FCM APP ID")}</Label>
                <Input
                  id="fcm-app-id"
                  placeholder={t("Enter App ID")}
                  disabled={!canEdit}
                  {...register('appId')}
                />
                {errors.appId && (
                  <p className="text-sm text-red-500">{errors.appId.message}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="firebase-server-key">{t("FIREBASE SERVER KEY")}</Label>
                <Input
                  id="firebase-server-key"
                  type="password"
                  disabled={!canEdit}
                  placeholder={t("Enter Firebase Server Key")}
                  {...register('serverKey')}
                />
                {errors.serverKey && (
                  <p className="text-sm text-red-500">{errors.serverKey.message}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Instructions Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t("Setup Instructions")}</h3>

            <div className="space-y-3">
              {firebaseInstructions.map((step, idx) => (
                <Alert key={idx} className="text-sm">
                  <div className="flex items-start gap-3">
                    <span className="font-medium">{idx + 1}.</span>
                    <AlertDescription>
                      {t(step)}
                    </AlertDescription>
                  </div>
                </Alert>
              ))}
            </div>
          </div>
        </CardContent>
        {canEdit && <CardFooter className="flex justify-end gap-2 flex-wrap">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? t("Saving...") : t("Save Settings")}
          </Button>
        </CardFooter>}
      </Card>
    </form>
  );
}