import { useSWRFix } from "@/shared-lib";
import { getMembersYouMayLike, mayLikeResponse } from "../_api/getMembersYouMayLike";

export const useMayLike = () => {
    const { data, loading, error, mutate } = useSWRFix<mayLikeResponse>({
        key: ' may-like',
        fetcher: async () => {
            const response = await getMembersYouMayLike();
            if (!response) {
                throw new Error('Failed to fetch dashboard statistics');
            }
            return response;
        }
    });

    return {
        mayLike: data?.data,
        mayLikeLoading: loading,
        error,
        mutate
    };
};