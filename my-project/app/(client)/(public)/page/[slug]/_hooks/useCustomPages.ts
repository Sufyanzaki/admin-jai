import {getBasicPagesByKey} from "@/app/shared-api/basicPageApi";
import {useSWRFix} from "@/shared-lib";
import {BasicPageDto} from "@/app/admin/(dashboard)/frontend-settings/_types/basicPage";

export const useCustomPages = (key?: string) => {
    const { data, loading, error, mutate } = useSWRFix<BasicPageDto>({
        key: `custom-page-${key}`,
        fetcher: async () => {
            if (!key) throw new Error('Page Key is required');
            const response = await getBasicPagesByKey(key);
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