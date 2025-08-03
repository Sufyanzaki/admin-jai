"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Controller } from "react-hook-form";
import useStripeForm from "../_hooks/useStripeForm";

export default function StripeForm() {
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
    return <div>Loading Stripe settings...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Stripe Settings</h3>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="stripe-secret"
                type="password"
                placeholder="Enter your Stripe secret key"
                {...register('key')}
              />
            </div>
            {errors.key && (
              <p className="text-sm text-red-500">{errors.key.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stripe-publish">Stripe Publishable Key</Label>
            <Input
              id="stripe-publish"
              type="password"
              placeholder="Enter your Stripe publishable key"
              {...register('publicKey')}
            />
            {errors.publicKey && (
              <p className="text-sm text-red-500">{errors.publicKey.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stripe-status">Activation Status</Label>
            <div className="flex items-center space-x-2">
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="stripe-status"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <span className="text-sm">Enable Stripe payments</span>
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