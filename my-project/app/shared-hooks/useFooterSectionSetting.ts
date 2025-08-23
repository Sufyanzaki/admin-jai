"use client";

import {useSWRFix} from "@/shared-lib";
import {FooterSectionDto} from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";
import { getFooterSectionDetails } from "@/app/shared-api/footerApi";

export function useFooterSectionSetting(id?:string) {
    const {
        data,
        error,
        loading,
        mutate,
        refetch
    } = useSWRFix<FooterSectionDto>({
        key: id ? `footer-section-${id}` : null,
        fetcher: async () => {
            if(!id) throw new Error("Footer section ID is required");
            return await getFooterSectionDetails(id);
        },
        config: {
            revalidateOnReconnect: false,
        }
    });

    return {
        data,
        error,
        isLoading: loading,
        mutate,
        refetch,
    };
}