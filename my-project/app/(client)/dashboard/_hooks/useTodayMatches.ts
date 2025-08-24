import { useSWRFix } from "@/shared-lib";
import { getTodayMatches, TodayMatchesResponse } from "../_api/getTodaysMatches";
import { useTranslation } from "react-i18next";

export const useTodayMatches = () => {
    const { t } = useTranslation();
    const { data, loading, error, mutate } = useSWRFix<TodayMatchesResponse>({
        key: 'today-matches',
        fetcher: async () => {
            const response = await getTodayMatches();
            if (!response) {
                throw new Error(t('Failed to fetch dashboard statistics'));
            }
            return response;
        }
    });

    return {
        matches: data?.data,
        matchesLoading: loading,
        matchesError: error,
        mutate
    };
};