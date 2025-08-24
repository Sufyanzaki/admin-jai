"use client";

import { useSWRFix } from "@/shared-lib";
import { getProfileAttribute } from "@/app/shared-api/getProfileAttribute";
import { ProfileAttributeResponse } from "@/app/shared-types/attribute";
import { useTranslation } from "react-i18next";

export const useProfileAttribute = (key: string) => {
    const { t } = useTranslation();

    const { data, loading, error, mutate } = useSWRFix<ProfileAttributeResponse>({
        key: `profile-attribute-${key}`,
        fetcher: async () => {
            const response = await getProfileAttribute(key);
            if (!response) {
                throw new Error(
                    t(`Failed to fetch profile attribute for key: ${key}`, )
                );
            }
            return response;
        },
        transform: (data) => {
            const updatedAttr = data.options
                ? data.options.split(",").map((s) => s.trim()).filter(Boolean)
                : [];
            return { ...data, updatedAttr };
        },
    });

    return {
        profileAttribute: data,
        profileAttributeLoading: loading,
        getProfileAttributeError: error,
        mutate,
    };
};
