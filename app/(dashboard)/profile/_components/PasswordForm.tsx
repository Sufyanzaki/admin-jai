"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import usePasswordForm from "@/app/(dashboard)/profile/_hooks/usePasswordForm";

export default function PasswordForm() {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading
  } = usePasswordForm();
  return (
    <form onSubmit={handleSubmit((data: any) => onSubmit(data, () => console.log("Password updated successfully!")))} className="space-y-4">
      {errors.root && (
        <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">
          {errors.root.message}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="current-password">Current Password</Label>
        <Input 
          id="current-password" 
          type="password" 
          {...register('currentPassword')}
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-400">{errors.currentPassword.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <Input 
          id="new-password" 
          type="password" 
          {...register('newPassword')}
        />
        {errors.newPassword && (
          <p className="text-sm text-red-400">{errors.newPassword.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <Input 
          id="confirm-password" 
          type="password" 
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading}
      >
        {isLoading ? "Updating Password..." : "Update Password"}
      </Button>
    </form>
  )
}