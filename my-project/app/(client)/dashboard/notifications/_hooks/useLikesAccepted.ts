import { useSWRFix } from "@/shared-lib";
import { accpetedLikesResponse, getLikesAccepted } from "../_api/getLikesAccepted";

export const useLikesAccepted = () => {
    const { data, loading, error, mutate } = useSWRFix<accpetedLikesResponse>({
        key: 'likes-recieved',
        fetcher: async () => {
            const response = await getLikesAccepted();
            if (!response) {
                throw new Error('Failed to fetch likes recieved');
            }
            return response;
        }
    });

    return {
        likesAccepted: data?.data,
        likesAcceptedLoading: loading,
        error,
        mutate
    };
};