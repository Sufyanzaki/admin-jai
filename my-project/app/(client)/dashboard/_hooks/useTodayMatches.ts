import {useSWRFix} from "@/shared-lib";
import { getTodayMatches, TodayMatchesResponse } from "../_api/getTodaysMatches";

export const useTodayMatches = () => {
    const { data, loading, error, mutate } = useSWRFix<TodayMatchesResponse>({
        key: 'today-matches',
        fetcher: async () => {
            const response = await getTodayMatches();
            if (!response) {
                throw new Error('Failed to fetch dashboard statistics');
            }
            return response;
        }
    });

    return {
        matches: data?.data,
        matchesLoading: loading,
        error,
        mutate
    };
};