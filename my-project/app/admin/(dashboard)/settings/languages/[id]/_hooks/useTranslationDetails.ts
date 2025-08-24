import { useSWRFix } from "@/shared-lib";
import { useSession } from "next-auth/react";
import { getTranslationDetails } from "@/app/admin/(dashboard)/settings/languages/[id]/_api/translationApi";
import { LanguageTranslationsDto } from "@/app/admin/(dashboard)/settings/languages/[id]/_types/translation";
import { useTranslation } from "react-i18next";

export const useTranslationDetails = (id: string, page: number = 1, search?: string) => {
    const { t } = useTranslation();
    const { data: session } = useSession();

    const key = session?.token && id
        ? `translation-details-${id}-page-${page}${search ? `-search-${search}` : ''}`
        : '';

    const { data, loading, error, mutate } = useSWRFix<LanguageTranslationsDto>({
        key,
        fetcher: async () => {
            const response = await getTranslationDetails(id, page, search);
            if (!response) throw new Error(t('Failed to fetch translation details'));
            return response;
        }
    });

    return {
        response: data,
        responseLoading: loading,
        error,
        mutate
    };
};