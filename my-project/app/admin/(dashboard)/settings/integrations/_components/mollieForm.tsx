"use client";

import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Switch } from "@/components/admin/ui/switch";
import { Controller } from "react-hook-form";
import { CreditCard } from "lucide-react";
import useMollieForm from "../_hooks/useMollieForm";
import Preloader from "@/components/shared/Preloader";
import { useTranslation } from "react-i18next";

export default function MollieForm({ canEdit }: { canEdit: boolean }) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    isLoadingData,
    control,
  } = useMollieForm();

  if (isLoadingData) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">{t("Loading Mollie settings")}</p>
        </div>
    );
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              {t("Mollie Settings")}
            </CardTitle>
            <CardDescription>{t("Configure your Mollie payment gateway")}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Mollie Key */}
            <div className="space-y-2">
        <Label htmlFor="mollie-key">{t("Mollie API Key")}</Label>
        <Input
          id="mollie-key"
          type="password"
          placeholder={t("Enter your Mollie API key")}
          disabled={!canEdit}
          {...register("key")}
        />
              {errors.key && (
                  <p className="text-sm text-red-500">{errors.key.message}</p>
              )}
            </div>

            {/* Activation Status */}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="mollie-status">{t("Activation Status")}</Label>
                <p className="text-xs text-muted-foreground">
                  {t("Enable/disable Mollie payment gateway")}
                </p>
              </div>
              <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                      <Switch
                          id="mollie-status"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!canEdit}
                      />
                  )}
              />
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
