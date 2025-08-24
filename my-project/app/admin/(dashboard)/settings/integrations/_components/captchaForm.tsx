"use client";

import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Switch } from "@/components/admin/ui/switch";
import { Building } from "lucide-react";
import { Controller } from "react-hook-form";
import useCaptchaForm from "../_hooks/useCaptchaForm";
import { useTranslation } from "react-i18next";
import Preloader from "@/components/shared/Preloader";

export default function CaptchaForm({ canEdit }: { canEdit: boolean }) {
  const { t } = useTranslation();
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
          <Preloader />
          <p className="text-sm">{t("Loading captcha settings")}</p>
        </div>
    );
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="mr-2 h-5 w-5" />
              {t("Third Party Settings")}
            </CardTitle>
            <CardDescription>
              {t("Configure third-party integrations and services")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google reCAPTCHA Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("Google reCAPTCHA")}</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="recaptcha-status">{t("Activation Status")}</Label>
                    <p className="text-xs text-muted-foreground">
                      {t("Enable/disable Google reCAPTCHA protection")}
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
                              disabled={!canEdit}
                          />
                      )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
          <Label htmlFor="site-key">{t("SITE KEY")}</Label>
          <Input
            id="site-key"
            placeholder={t("Enter your reCAPTCHA site key")}
            {...register("siteKey")}
            disabled={!canEdit}
          />
                    {errors.siteKey && (
                        <p className="text-sm text-red-500">
                          {errors.siteKey.message}
                        </p>
                    )}
                  </div>
                  <div className="space-y-2">
          <Label htmlFor="secret-key">{t("SECRET KEY")}</Label>
          <Input
            id="secret-key"
            type="password"
            placeholder={t("Enter your reCAPTCHA secret key")}
            {...register("siteSecret")}
            disabled={!canEdit}
          />
                    {errors.siteSecret && (
                        <p className="text-sm text-red-500">
                          {errors.siteSecret.message}
                        </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          {canEdit && (
              <CardFooter className="flex justify-end gap-2 flex-wrap">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? t("Saving...") : t("Save Settings")}
                </Button>
              </CardFooter>
          )}
        </Card>
      </form>
  );
}
