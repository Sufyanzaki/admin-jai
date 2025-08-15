import {SearchFormValues} from "@/app/(client)/dashboard/_hooks/useSearchForm";
import {useSWRFix} from "@/shared-lib";
import {fetchSearch} from "@/app/(client)/dashboard/_api/getSearch";
import {SearchApiResponse} from "@/app/(client)/dashboard/search/_types/search";

export function useSearch(params: SearchFormValues) {
    const { data, loading, error } = useSWRFix<SearchApiResponse>({
        key: params ? `searchResults-${params}}` : "",
        fetcher: async () => {
            const response = await fetchSearch(params);
            if (!response) {
                throw new Error("Failed to fetch search results");
            }
            return response;
        }
    });

    return {
        data,
        isLoading: loading,
        error,
    };
}
