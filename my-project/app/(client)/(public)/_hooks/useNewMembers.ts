import {useSWRFix} from "@/shared-lib";
import {newUsers} from "@/app/shared-api/userApi";
import {MemberProfile} from "@/app/shared-types/member";

export const useNewMembers = () => {

    const { data, loading, error, mutate } = useSWRFix<{ten: MemberProfile[]}>({
        key: `new-members`,
        fetcher: async () => {
            const response = await newUsers();
            if (!response) {
                throw new Error('Failed to fetch banner details');
            }
            return response;
        }
    });

    return {
        users: data?.ten ?? [],
        userLoading: loading,
        error,
        mutate
    };
};