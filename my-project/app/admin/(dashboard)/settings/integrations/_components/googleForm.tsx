"use client";

import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Switch } from "@/components/admin/ui/switch";
import { Controller } from "react-hook-form";
import useGoogleSettingsForm from "../_hooks/useGoogleSettingsForm";
import { useTranslation } from "react-i18next";

export default function GoogleForm({ canEdit }: { canEdit: boolean }) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    isLoadingData,
    control,
  } = useGoogleSettingsForm();

  if (isLoadingData) {
    return <div>{t("Loading Google settings...")}</div>;
  }

  return (
      <form onSubmit={handleSubmit(v=>onSubmit(v))}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            {t("Google Login")}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="google-status">{t("Activation")}</Label>
                <p className="text-xs text-muted-foreground">{t("Enable Google authentication")}</p>
              </div>
              <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                      <Switch
                          id="google-status"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!canEdit}
                      />
                  )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
        <Label htmlFor="google-client-id">{t("CLIENT ID")}</Label>
        <Input
          id="google-client-id"
          placeholder={t("Enter Google Client ID")}
          {...register("clientId")}
          disabled={!canEdit}
        />
                {errors.clientId && (
                    <p className="text-sm text-red-500">{errors.clientId.message}</p>
                )}
              </div>
              <div className="space-y-2">
        <Label htmlFor="google-client-secret">{t("CLIENT SECRET")}</Label>
        <Input
          id="google-client-secret"
          type="password"
          placeholder={t("Enter Google Client Secret")}
          {...register("clientSecret")}
          disabled={!canEdit}
        />
                {errors.clientSecret && (
                    <p className="text-sm text-red-500">{errors.clientSecret.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

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
