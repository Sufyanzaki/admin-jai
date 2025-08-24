"use client";

import type React from "react";
import { Button } from "@/components/client/ux/button";
import { Input } from "@/components/client/ux/input";
import { Label } from "@/components/client/ux/label";
import useLoginForm from "../_hooks/useLoginForm";
import { useTranslation } from "react-i18next";

export function LoginForm() {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
    } = useLoginForm();

    return (
        <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className="space-y-6"
        >
            <div>
                <Label htmlFor="email">{t("Email address")}</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder={t("name@email.com")}
                    {...register("email")}
                    className="h-12"
                    required
                />
                {errors.email && (
                    <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
            </div>

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

            <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                variant="theme"
                className="w-full"
            >
                {isSubmitting ? t("Processing...") : t("Login")}
            </Button>
        </form>
    );
}
