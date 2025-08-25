'use client'

import Link from "next/link";
import type React from "react";
import { useTranslation } from "react-i18next";
import {ResetForm} from "@/app/(client)/auth/reset-password/_components/reset-form";

export default function ResetPage() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6 w-full">
            <div className="text-start space-y-2">
                <h3 className="text-[22px] lg:text-[26px] font-bold">
                    {t("Reset Password")}
                </h3>
            </div>
            <ResetForm />
            <p className="text-sm text-end mt-8 mb-12 lg:mb-0">
                <Link
                    href="/auth/forgot-password"
                    className="text-gray-500 hover:text-gray-700 hover:underline"
                >
                    {t("Forgot your password?")}
                </Link>
            </p>
        </div>
    );
}
