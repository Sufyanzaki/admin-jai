import {useSWRFix} from "@/shared-lib";
import {BannerDto} from "@/app/admin/(dashboard)/marketing/banners/_types/bannerTypes";
import {getActivity} from "@/app/admin/(dashboard)/profile/_api/getActivity";

export const useActivity = () => {

    const { data, loading, error, mutate } = useSWRFix<BannerDto>({
        key: `activity-log`,
        fetcher: async () => {
            const response = await getActivity();
            if (!response) throw new Error('Failed to fetch banner details');
            return response;
        }
    });

    return {
        data,
        loading,
        error,
        mutate
    };
};