import {useSWRFix} from "@/shared-lib";
import { getBlockedProfiles } from "../_api/getBlockedProfiles";
import {MemberProfile} from "@/app/shared-types/member";

export const useBlockedProfiles = () => {
    const { data, loading, error, mutate } = useSWRFix<MemberProfile[]>({
        key: 'blocked-profiles',
        fetcher: async () => {
            const response = await getBlockedProfiles();
            if (!response) {
                throw new Error('Failed to fetch blocked profiles');
            }
            return response;
        }
    });

    return {
        blockedProfiles: data,
        blockedLoading: loading,
        error,
        mutate
    };
};