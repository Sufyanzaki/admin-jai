"use client";

import type React from "react";
import {Button} from "@/components/client/ux/button";
import {Input} from "@/components/client/ux/input";
import {Label} from "@/components/client/ux/label";
import {useTranslation} from "react-i18next";
import useForgotForm from "@/app/(client)/auth/forgot-password/_hooks/useForgotForm";

export function ForgotPassword() {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
    } = useForgotForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <Label htmlFor="email">{t("Email address")}</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder={t("name@email.com")}
                    {...register("email", { required: t("Email is required") })}
                    className="h-12"
                    required
                />
                {errors.email && (
                    <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
            </div>
            <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                variant="theme"
                className="w-full"
            >
                {isSubmitting ? t("Processing...") : t("Send Reset Link")}
            </Button>
        </form>
    );
}