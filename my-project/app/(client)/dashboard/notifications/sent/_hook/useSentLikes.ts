import {useSWRFix} from "@/shared-lib";
import {ApiResponseDto} from "@/app/(client)/dashboard/notifications/_types/notification";
import {getLikesSent} from "@/app/(client)/dashboard/notifications/_api/likes";

export const useSentLikes = () => {
    const { data, loading, error, mutate } = useSWRFix<ApiResponseDto>({
        key: `sent-likes`,
        fetcher: async () => {
            const response = await getLikesSent();
            if (!response) throw new Error("Failed to fetch likes received");
            return response;
        }
    });

    return {
        likes: data?.data,
        likesLoading: loading,
        error,
        mutate
    };
};
