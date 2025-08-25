"use client";

import type React from "react";
import { Button } from "@/components/client/ux/button";
import { Input } from "@/components/client/ux/input";
import { Label } from "@/components/client/ux/label";
import { useTranslation } from "react-i18next";
import useResetForm from "@/app/(client)/auth/reset-password/_hook/useResetForm";

export function ResetForm() {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
    } = useResetForm();

    return (
        <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className="space-y-6"
        >
            <div>
                <Label htmlFor="password">{t("Password")}</Label>
                <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    placeholder={t("Choose password")}
                    className="h-12"
                    required
                />
                {errors.password && (
                    <p className="text-sm text-red-400">{errors.password.message}</p>
                )}
            </div>

            <div>
                <Label htmlFor="confirmPassword">{t("Confirm Password")}</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    placeholder={t("Confirm password")}
                    className="h-12"
                    required
                />
                {errors.confirmPassword && (
                    <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
                )}
            </div>

            <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                variant="theme"
                className="w-full"
            >
                {isSubmitting ? t("Processing...") : t("Reset Password")}
            </Button>
        </form>
    );
}
