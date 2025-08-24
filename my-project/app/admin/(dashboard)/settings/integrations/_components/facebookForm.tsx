"use client";

import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Switch } from "@/components/admin/ui/switch";
import { Facebook } from "lucide-react";
import { Controller } from "react-hook-form";
import useFacebookSettingsForm from "../_hooks/useFacebookSettingsForm";
import { useTranslation } from "react-i18next";

export default function FacebookForm({ canEdit }: { canEdit: boolean }) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    isLoadingData,
    control,
  } = useFacebookSettingsForm();

  if (isLoadingData) {
    return <div>{t("Loading Facebook settings...")}</div>;
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Facebook className="h-5 w-5" />
            {t("Facebook Login")}
          </h3>
          <div className="space-y-4">
            {/* Activation */}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="facebook-status">{t("Activation")}</Label>
                <p className="text-xs text-muted-foreground">
                  {t("Enable Facebook authentication")}
                </p>
              </div>
              <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                      <Switch
                          id="facebook-status"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!canEdit}
                      />
                  )}
              />
            </div>

            {/* Client ID & Secret */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
        <Label htmlFor="facebook-client-id">{t("CLIENT ID")}</Label>
        <Input
          id="facebook-client-id"
          placeholder={t("Enter Facebook App ID")}
          {...register("clientId")}
          disabled={!canEdit}
        />
                {errors.clientId && (
                    <p className="text-sm text-red-500">{errors.clientId.message}</p>
                )}
              </div>
              <div className="space-y-2">
        <Label htmlFor="facebook-client-secret">{t("CLIENT SECRET")}</Label>
        <Input
          id="facebook-client-secret"
          type="password"
          placeholder={t("Enter Facebook App Secret")}
          {...register("clientSecret")}
          disabled={!canEdit}
        />
                {errors.clientSecret && (
                    <p className="text-sm text-red-500">
                      {errors.clientSecret.message}
                    </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {canEdit && (
            <div className="flex gap-2 flex-wrap mt-6 justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? t("Saving...") : t("Save All Settings")}
              </Button>
            </div>
        )}
      </form>
  );
}
