'use client'
import type React from "react";
import { useTranslation } from "react-i18next";
import {ForgotPassword} from "@/app/(client)/auth/forgot-password/_components/forgot-form";
import Link from "next/link";

export default function ForgotPage() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6 w-full">
            <div className="text-start space-y-2">
                <h3 className="text-[22px] lg:text-[26px] font-bold">
                    {t("Reset Password")}
                </h3>
            </div>
            <ForgotPassword />
            <p className="text-sm text-end mt-8 mb-12 lg:mb-0">
                <Link href="/auth/login"
                    className="text-gray-500 hover:text-gray-700 hover:underline"
                >
                    {t("Back to login")}
                </Link>
            </p>
        </div>
    );
}
