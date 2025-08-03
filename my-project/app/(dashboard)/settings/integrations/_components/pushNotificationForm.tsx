"use client"

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Building } from "lucide-react";
import { Controller } from "react-hook-form";
import usePushForm from "../_hooks/usePushForm";
import Preloader from "@/components/ui/Preloader";

const firebaseInstructions = [
  "Log in to Google Firebase and Create a new app if you don’t have any.",
  "Go to Project Settings and select General tab.",
  "Select Config and you will find Firebase Config Credentials.",
  "Copy your App’s Credentials and paste the Credentials into appropriate fields.",
  "Now, select Cloud Messaging tab and Enable Cloud Messaging API.",
  "After enabling Cloud Messaging API, you will find Server Key. Copy the key value and paste into FIREBASE SERVER KEY field.",
  'Configure the "firebase-messaging-sw.js" file and keep the file in the root directory of your cPanel.'
];

export default function PushNotificationForm() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    isLoadingData,
    control,
    reset,
    existingData,
  } = usePushForm();

  if (isLoadingData) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader/>
          <p className="text-sm">Loading push notification settings</p>
        </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>Configure Firebase Cloud Messaging (FCM) settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Settings Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Firebase Configuration</h3>

            <div className="flex items-center justify-between pb-4">
              <div>
                <Label htmlFor="push-status">Activation</Label>
                <p className="text-xs text-muted-foreground">
                  Enable/disable push notifications service
                </p>
              </div>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="push-status"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fcm-api-key">FCM API KEY</Label>
                <Input
                  id="fcm-api-key"
                  type="password"
                  placeholder="Enter FCM API Key"
                  {...register('fcmApiKey')}
                />
                {errors.fcmApiKey && (
                  <p className="text-sm text-red-500">{errors.fcmApiKey.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fcm-auth-domain">FCM AUTH DOMAIN</Label>
                <Input
                  id="fcm-auth-domain"
                  placeholder="Enter Auth Domain"
                  {...register('authDomain')}
                />
                {errors.authDomain && (
                  <p className="text-sm text-red-500">{errors.authDomain.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fcm-project-id">FCM PROJECT ID</Label>
                <Input
                  id="fcm-project-id"
                  placeholder="Enter Project ID"
                  {...register('projectId')}
                />
                {errors.projectId && (
                  <p className="text-sm text-red-500">{errors.projectId.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fcm-storage-bucket">FCM STORAGE BUCKET</Label>
                <Input
                  id="fcm-storage-bucket"
                  placeholder="Enter Storage Bucket"
                  {...register('storageBucket')}
                />
                {errors.storageBucket && (
                  <p className="text-sm text-red-500">{errors.storageBucket.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fcm-sender-id">FCM MESSAGING SENDER ID</Label>
                <Input
                  id="fcm-sender-id"
                  placeholder="Enter Sender ID"
                  {...register('messagingSenderId')}
                />
                {errors.messagingSenderId && (
                  <p className="text-sm text-red-500">{errors.messagingSenderId.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fcm-app-id">FCM APP ID</Label>
                <Input
                  id="fcm-app-id"
                  placeholder="Enter App ID"
                  {...register('appId')}
                />
                {errors.appId && (
                  <p className="text-sm text-red-500">{errors.appId.message}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="firebase-server-key">FIREBASE SERVER KEY</Label>
                <Input
                  id="firebase-server-key"
                  type="password"
                  placeholder="Enter Firebase Server Key"
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
            <h3 className="text-lg font-medium">Setup Instructions</h3>

            <div className="space-y-3">
              {firebaseInstructions.map((step, idx) => (
                <Alert key={idx} className="text-sm">
                  <div className="flex items-start gap-3">
                    <span className="font-medium">{idx + 1}.</span>
                    <AlertDescription>
                      {step}
                    </AlertDescription>
                  </div>
                </Alert>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 flex-wrap">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Settings"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}