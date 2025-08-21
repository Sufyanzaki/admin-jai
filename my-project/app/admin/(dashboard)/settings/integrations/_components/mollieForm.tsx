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

export default function MollieForm({ canEdit }: { canEdit: boolean }) {
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
          <p className="text-sm">Loading Mollie settings</p>
        </div>
    );
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Mollie Settings
            </CardTitle>
            <CardDescription>Configure your Mollie payment gateway</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Mollie Key */}
            <div className="space-y-2">
              <Label htmlFor="mollie-key">Mollie API Key</Label>
              <Input
                  id="mollie-key"
                  type="password"
                  placeholder="Enter your Mollie API key"
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
                <Label htmlFor="mollie-status">Activation Status</Label>
                <p className="text-xs text-muted-foreground">
                  Enable/disable Mollie payment gateway
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
              {isLoading ? "Saving..." : "Save Settings"}
            </Button>
          </CardFooter>}
        </Card>
      </form>
  );
}
