'use client'
import { LoginForm } from "./_components/login-form";
import type React from "react";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6 w-full">
            <div className="text-start space-y-2">
                <h3 className="text-[22px] lg:text-[26px] font-bold">
                    {t("Login")}
                </h3>
            </div>
            <LoginForm />
            <p className="text-sm text-end mt-8 mb-12 lg:mb-0">
                <a
                    href="/forgot-password"
                    className="text-gray-500 hover:text-gray-700 hover:underline"
                >
                    {t("Forgot your password?")}
                </a>
            </p>
        </div>
    );
}
