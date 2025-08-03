"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Building } from "lucide-react";
import { Controller } from "react-hook-form";
import useCaptchaForm from "../_hooks/useCaptchaForm";
import Preloader from "@/components/ui/Preloader";

export default function CaptchaForm() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    isLoadingData,
    control,
  } = useCaptchaForm();

  if (isLoadingData) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader/>
          <p className="text-sm">Loading captcha settings</p>
        </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-5 w-5" />
            Third Party Settings
          </CardTitle>
          <CardDescription>Configure third-party integrations and services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google reCAPTCHA Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Google reCAPTCHA</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="recaptcha-status">Activation Status</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable/disable Google reCAPTCHA protection
                  </p>
                </div>
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="recaptcha-status"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-key">SITE KEY</Label>
                  <Input
                    id="site-key"
                    placeholder="Enter your reCAPTCHA site key"
                    {...register('siteKey')}
                  />
                  {errors.siteKey && (
                    <p className="text-sm text-red-500">{errors.siteKey.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secret-key">SECRET KEY</Label>
                  <Input
                    id="secret-key"
                    type="password"
                    placeholder="Enter your reCAPTCHA secret key"
                    {...register('siteSecret')}
                  />
                  {errors.siteSecret && (
                    <p className="text-sm text-red-500">{errors.siteSecret.message}</p>
                  )}
                </div>
              </div>
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