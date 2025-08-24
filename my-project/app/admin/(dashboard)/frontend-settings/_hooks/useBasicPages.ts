'use client';

import { useSWRFix } from "@/shared-lib";
import { getBasicPages } from "@/app/shared-api/basicPageApi";
import { BasicPageDto } from "@/app/admin/(dashboard)/frontend-settings/_types/basicPage";
import { useTranslation } from "react-i18next";

export const useBasicPages = () => {
    const { t } = useTranslation();

    const { data, loading, error, mutate } = useSWRFix<BasicPageDto[]>({
        key: 'basic-pages-settings',
        fetcher: async () => {
            const response = await getBasicPages();
            if (!response) throw new Error(t('Failed to fetch basic pages'));
            return response;
        }
    });

    return {
        basicPages: data,
        isLoading: loading,
        error,
        mutate
    };
};