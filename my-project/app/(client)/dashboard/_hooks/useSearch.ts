import { SearchFormValues } from "@/app/(client)/dashboard/_hooks/useSearchForm";
import { useSWRFix } from "@/shared-lib";
import { fetchSearch } from "@/app/(client)/dashboard/_api/getSearch";
import { SearchApiResponse } from "@/app/(client)/dashboard/search/_types/search";
import { useTranslation } from "react-i18next";

export function useSearch(params: SearchFormValues) {
    const { t } = useTranslation();
    const { data, loading, error, mutate } = useSWRFix<SearchApiResponse>({
        key: params ? `searchResults-${params}}` : "",
        fetcher: async () => {
            const response = await fetchSearch(params);
            if (!response) {
                throw new Error(t("Failed to fetch search results"));
            }
            return response;
        }
    });

    return {
        data,
        isLoading: loading,
        error,
        mutate
    };
}
