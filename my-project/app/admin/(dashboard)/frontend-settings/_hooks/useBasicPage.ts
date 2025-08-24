import { useSWRFix } from "@/shared-lib";
import { BasicPageDto } from "../_types/basicPage";
import { getBasicPagesById } from "@/app/shared-api/basicPageApi";
import { useTranslation } from "react-i18next";

export const useBasicPage = (id?: string) => {
    const { t } = useTranslation();

    const { data, loading, error, mutate } = useSWRFix<BasicPageDto>({
        key: `basic-page-${id}`,
        fetcher: async () => {
            if (!id) throw new Error('Page ID is required');
            const response = await getBasicPagesById(id);
            if (!response) throw new Error(t('Failed to fetch basic page'));
            return response;
        }
    });

    return {
        basicPage: data,
        isLoading: loading,
        error,
        mutate
    };
};