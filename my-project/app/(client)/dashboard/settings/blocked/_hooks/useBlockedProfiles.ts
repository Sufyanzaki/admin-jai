import { useSWRFix } from "@/shared-lib";
import { blockedProfilesResponse, getBlockedProfiles } from "../_api/getBlockedProfiles";

export const useBlockedProfiles = () => {
    const { data, loading, error, mutate } = useSWRFix<blockedProfilesResponse>({
        key: 'blocked-profiles',
        fetcher: async () => {
            const response = await getBlockedProfiles();
            if (!response) {
                throw new Error('Failed to fetch blocked profiless');
            }
            return response;
        }
    });

    return {
        blockedProfiles: data?.data,
        blockedLoading: loading,
        error,
        mutate
    };
};