"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Controller } from "react-hook-form";
import useMollieForm from "../_hooks/useMollieForm";

export default function MollieForm() {
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
    return <div>Loading Mollie settings...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Mollie Settings</h3>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="mollie-key">Mollie Key</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="mollie-key"
                type="password"
                placeholder="Enter your Mollie API key"
                {...register('key')}
              />
            </div>
            {errors.key && (
              <p className="text-sm text-red-500">{errors.key.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mollie-status">Activation Status</Label>
            <div className="flex items-center space-x-2">
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="mollie-status"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <span className="text-sm">Enable Mollie payments</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 flex-wrap mt-6">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}