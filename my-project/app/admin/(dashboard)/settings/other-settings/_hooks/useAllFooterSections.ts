"use client";

import {useSWRFix} from "@/shared-lib";
import {FooterSectionDto} from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";
import {getFooterSections} from "@/app/admin/(dashboard)/settings/other-settings/_api/footerApi";

export function useAllFooterSections() {
    const {
        data:sections,
        error:sectionsError,
        loading: sectionsLoading,
        mutate: sectionsMutate,
        refetch: sectionsRefetch,
    } = useSWRFix<FooterSectionDto[]>({
        key: "footer-all-settings",
        fetcher: async () => await getFooterSections(),
        config: {
            revalidateOnReconnect: false,
        }
    });

    return { sections, sectionsError, sectionsLoading, sectionsMutate, sectionsRefetch };
}