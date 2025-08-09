"use client";

import {Label} from "@/components/client/ux/label";
import {Input} from "@/components/client/ux/input";
import {Button} from "@/components/client/ux/button";
import usePasswordForm from "@/app/shared-hooks/usePasswordForm";

export default function PasswordForm() {

    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        onSubmit,
    } = usePasswordForm();

    return (
        <form
            onSubmit={handleSubmit(v=>onSubmit(v))}
            className="flex flex-col gap-8 justify-center"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                        id="currentPassword"
                        type="password"
                        placeholder="••••••••••••"
                        className="mt-2"
                        {...register("currentPassword")}
                    />
                    {errors.currentPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.currentPassword.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                        id="newPassword"
                        type="password"
                        placeholder="••••••••••••"
                        className="mt-2"
                        {...register("newPassword")}
                    />
                    {errors.newPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.newPassword.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••••••"
                        className="mt-2"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex justify-center gap-3 mt-8">
                <Button
                    type="submit"
                    variant="theme"
                    size="lg"
                    className="ml-auto"
                    disabled={isLoading}
                >
                    {isLoading ? "Saving..." : "Save"}
                </Button>
            </div>
        </form>
    );
}
