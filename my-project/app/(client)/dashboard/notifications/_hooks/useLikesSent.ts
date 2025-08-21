import { useSWRFix } from "@/shared-lib";
import { getLikesSent } from "../_api/likes";
import {ApiResponseDto} from "@/app/(client)/dashboard/notifications/_types/notification";

export const useLikesSent = () => {
    const { data, loading, error, mutate } = useSWRFix<ApiResponseDto>({
        key: 'likes-received',
        fetcher: async () => {
            const response = await getLikesSent();
            if (!response) {
                throw new Error('Failed to fetch likes received');
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