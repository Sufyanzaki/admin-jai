import { useSWRFix } from "@/shared-lib";
import { getLikesSent, likesSentResponse } from "../_api/getLikesSent";

export const useLikesSent = () => {
    const { data, loading, error, mutate } = useSWRFix<likesSentResponse>({
        key: 'likes-recieved',
        fetcher: async () => {
            const response = await getLikesSent();
            if (!response) {
                throw new Error('Failed to fetch likes recieved');
            }
            return response;
        }
    });

    return {
        likesSent: data?.data,
        likesSentLoading: loading,
        error,
        mutate
    };
};