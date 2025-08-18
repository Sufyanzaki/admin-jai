import {useSWRFix} from "@/shared-lib";
import {AnalyticsFilters, getAnalytics} from "@/app/admin/(dashboard)/reports/_api/reportApi";
import {AnalyticsResponseDto} from "@/app/admin/(dashboard)/reports/_types/report";

export const useAnalytics = (params: AnalyticsFilters) => {
    const key = `analytics-${JSON.stringify(params || {})}`;
    const { data, loading, error, mutate, refetch } = useSWRFix<AnalyticsResponseDto>({
        key: `analytics-${key}`,
        fetcher: async () => {
            const response = await getAnalytics(params);
            if (!response) {
                throw new Error('Failed to fetch banner details');
            }
            return response;
        }
    });

    return {
        analytics: data,
        analyticLoading: loading,
        refetch,
        error,
        mutate
    };
};