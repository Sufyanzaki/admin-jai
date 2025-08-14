import {useSWRFix} from "@/shared-lib";
import {useSession} from "next-auth/react";
import {getTranslationDetails} from "@/app/admin/(dashboard)/settings/languages/[id]/_api/translationApi";
import {LanguageTranslationsDto} from "@/app/admin/(dashboard)/settings/languages/[id]/_types/translation";

export const useTranslationDetails = (id: string) => {
    const { data: session } = useSession();

    const { data, loading, error, mutate } = useSWRFix<LanguageTranslationsDto>({
        key: session?.token && id ? `banner-details-${id}` : '',
        fetcher: async () => {
            const response = await getTranslationDetails(id);
            if (!response) throw new Error('Failed to fetch banner details');
            return response;
        }
    });

    return {
        translation: data,
        translationLoading: loading,
        error,
        mutate
    };
};