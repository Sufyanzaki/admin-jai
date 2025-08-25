"use client"

import { AccountSettings } from "./_components/account-settings";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

export default function AccountPage() {
    const { t } = useTranslation();

    return (
        <Suspense fallback={<div>{t("Loading...")}</div>}>
            <AccountSettings />
        </Suspense>
    );
}
