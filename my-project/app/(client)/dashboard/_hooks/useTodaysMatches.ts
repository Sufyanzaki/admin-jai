import {useSWRFix} from "@/shared-lib";
import { getTodaysMatches, TodayMatchesResponse } from "../_api/getTodaysMatches";

export const useTodaysMatches = () => {
    const { data, loading, error, mutate } = useSWRFix<TodayMatchesResponse>({
        key: 'todays-matches',
        fetcher: async () => {
            const response = await getTodaysMatches();
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