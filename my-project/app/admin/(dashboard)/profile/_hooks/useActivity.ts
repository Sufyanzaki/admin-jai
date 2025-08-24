import {useSWRFix} from "@/shared-lib";
import {ActivityResponse, getActivity} from "@/app/admin/(dashboard)/profile/_api/getActivity";

export const useActivity = () => {

    const { data, loading, error, mutate } = useSWRFix<ActivityResponse>({
        key: `activity-log`,
        fetcher: async () => {
            const response = await getActivity();
            if (!response) throw new Error('Failed to fetch banner details');
            return response;
        }
    });

    return {
        data: data?.activities ?? [],
        loading,
        error,
        mutate
    };
};