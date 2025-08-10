import { useSWRFix } from "@/shared-lib";
import { getLikesRecieved, likesRecievedResponse } from "../_api/getLikesRecived";

export const useLikesRecieved = () => {
    const { data, loading, error, mutate } = useSWRFix<likesRecievedResponse>({
        key: 'likes-recieved',
        fetcher: async () => {
            const response = await getLikesRecieved();
            if (!response) {
                throw new Error('Failed to fetch likes recieved');
            }
            return response;
        }
    });

    return {
        likesRecieved: data?.data,
        likesRecievedLoading: loading,
        error,
        mutate
    };
};