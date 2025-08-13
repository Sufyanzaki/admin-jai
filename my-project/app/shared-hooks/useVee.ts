'use client';

import {useSWRFix} from "@/shared-lib";
import {VeeDto} from "@/app/shared-types/vee";
import {getVeeSettings} from "@/app/shared-api/veeApi";

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
