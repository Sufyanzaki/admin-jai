"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Controller } from "react-hook-form";
import useGoogleSettingsForm from "../_hooks/useGoogleSettingsForm";

export default function GoogleForm() {
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
    return <div>Loading Google settings...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          Google Login
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="google-status">Activation</Label>
              <p className="text-xs text-muted-foreground">Enable Google authentication</p>
            </div>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch
                  id="google-status"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="google-client-id">CLIENT ID</Label>
              <Input
                id="google-client-id"
                placeholder="Enter Google Client ID"
                {...register('clientId')}
              />
              {errors.clientId && (
                <p className="text-sm text-red-500">{errors.clientId.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="google-client-secret">CLIENT SECRET</Label>
              <Input
                id="google-client-secret"
                type="password"
                placeholder="Enter Google Client Secret"
                {...register('clientSecret')}
              />
              {errors.clientSecret && (
                <p className="text-sm text-red-500">{errors.clientSecret.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap mt-6 justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save All Settings"}
        </Button>
      </div>
    </form>
  );
}