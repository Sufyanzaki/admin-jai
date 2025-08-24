"use client";

import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Switch } from "@/components/admin/ui/switch";
import { Controller } from "react-hook-form";
import useStripeForm from "../_hooks/useStripeForm";
import { useTranslation } from "react-i18next";

export default function StripeForm({ canEdit }: { canEdit: boolean }) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    isLoadingData,
    control,
  } = useStripeForm();

  if (isLoadingData) {
    return <div>{t("Loading Stripe settings...")}</div>;
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{t("Stripe Settings")}</h3>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="stripe-secret">{t("Stripe Secret Key")}</Label>
              <div className="flex items-center space-x-2">
                <Input
                    id="stripe-secret"
                    type="password"
                    placeholder={t("Enter your Stripe secret key")}
                    {...register("key")}
                    disabled={!canEdit}
                />
              </div>
              {errors.key && (
                  <p className="text-sm text-red-500">{errors.key.message}</p>
              )}
            </div>

            <div className="grid gap-2">
        <Label htmlFor="stripe-publish">{t("Stripe Publishable Key")}</Label>
        <Input
          id="stripe-publish"
          type="password"
          placeholder={t("Enter your Stripe publishable key")}
          {...register("publicKey")}
          disabled={!canEdit}
        />
              {errors.publicKey && (
                  <p className="text-sm text-red-500">{errors.publicKey.message}</p>
              )}
            </div>

            <div className="grid gap-2">
        <Label htmlFor="stripe-status">{t("Activation Status")}</Label>
        <div className="flex items-center space-x-2">
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <Switch
              id="stripe-status"
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={!canEdit}
            />
          )}
        />
        <span className="text-sm">{t("Enable Stripe payments")}</span>
        </div>
            </div>
          </div>
        </div>

        {canEdit && (
            <div className="flex justify-end gap-2 flex-wrap mt-6">
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">
                {isLoading ? t("Saving...") : t("Save Changes")}
              </button>
            </div>
        )}
      </form>
  );
}
