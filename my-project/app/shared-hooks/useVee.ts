'use client';

import { useSWRFix } from "@/shared-lib";
import { VeeDto } from "@/app/shared-types/vee";
import { getVeeSettings } from "@/app/shared-api/veeApi";
import { useTranslation } from "react-i18next";

export const useVee = () => {
    const { t } = useTranslation();

    const { data, loading, error, mutate } = useSWRFix<VeeDto>({
        key: "vee",
        fetcher: async () => {
            const response = await getVeeSettings();
            if (!response) throw new Error(t("errors.failedToFetchVeeSettings"));
            return response;
        },
    });

    return {
        veeData: data,
        veeLoading: loading,
        error,
        mutate,
    };
};
