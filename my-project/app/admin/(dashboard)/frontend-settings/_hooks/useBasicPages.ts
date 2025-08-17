'use client';

import { useSWRFix } from "@/shared-lib";
import { getBasicPages } from "@/app/shared-api/basicPageApi";
import {BasicPageDto} from "@/app/admin/(dashboard)/frontend-settings/_types/basicPage";

export const useBasicPages = () => {
    const { data, loading, error, mutate } = useSWRFix<BasicPageDto[]>({
        key: 'basic-pages-settings',
        fetcher: async () => {
            const response = await getBasicPages();
            if (!response) throw new Error('Failed to fetch basic pages');
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