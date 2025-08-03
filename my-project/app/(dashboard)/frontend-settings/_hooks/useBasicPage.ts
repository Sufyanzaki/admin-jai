import {useSWRFix} from "@/admin-utils/lib/useSwrFix";
import { BasicPageDto } from "../_types/basicPage";
import {getBasicPagesById} from "@/app/(dashboard)/frontend-settings/_api/basicPageApi";

export const useBasicPage = (id?: string) => {
    const { data, loading, error, mutate } = useSWRFix<BasicPageDto>({
        key: `basic-page-${id}`,
        fetcher: async () => {
            if (!id) throw new Error('Page ID is required');
            const response = await getBasicPagesById(id);
            if (!response) throw new Error('Failed to fetch basic page');
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