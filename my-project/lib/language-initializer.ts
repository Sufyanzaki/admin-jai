'use client';

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import i18n from "@/i18n";
import { useProfile } from "@/app/shared-hooks/useProfile";

export function LanguageInitializer() {
    const { response } = useProfile();
    const user = response?.user;

    useEffect(() => {
        if (user?.activeLanguage?.code) {
            console.log("Setting i18n to:", user.activeLanguage.code);
            i18n.changeLanguage(user.activeLanguage.code);
        }
    }, [user?.activeLanguage?.code]);

    return null; // nothing visual
}
