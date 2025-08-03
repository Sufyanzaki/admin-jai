'use client';

import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getTermsConditionsSettings } from "../_api/tosApi";
import { TermsSettingsDto } from "../_types/tosTypes";
import {getVeeSettings} from "@/app/(dashboard)/frontend-settings/_api/veeApi";
import {VeeDto} from "@/app/(dashboard)/frontend-settings/_types/vee";

export const useVee = () => {
    const { data, loading, error, mutate } = useSWRFix<VeeDto>({
        key: 'vee',
        fetcher: async () => {
            const response = await getVeeSettings();
            if (!response) throw new Error('Failed to fetch settings');
            return response;
        }
    });

    return {
        veeData: data,
        veeLoading: loading,
        error,
        mutate
    };
};
