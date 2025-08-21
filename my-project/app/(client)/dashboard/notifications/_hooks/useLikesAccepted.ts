import {useSWRFix} from "@/shared-lib";
import {ApiResponseDto} from "@/app/(client)/dashboard/notifications/_types/notification";
import {getLikesAccepted} from "../_api/likes";

export const useLikesAccepted = () => {
    const { data, loading, error, mutate } = useSWRFix<ApiResponseDto>({
        key: 'likes-received',
        fetcher: async () => {
            const response = await getLikesAccepted();
            if (!response) {
                throw new Error('Failed to fetch likes received');
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