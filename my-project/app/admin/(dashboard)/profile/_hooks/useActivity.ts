import {useSWRFix} from "@/shared-lib";
import { useTranslation } from "react-i18next";
import {BannerDto} from "@/app/admin/(dashboard)/marketing/banners/_types/bannerTypes";
import {ActivityResponse, getActivity} from "@/app/admin/(dashboard)/profile/_api/getActivity";

export const useActivity = () => {
    const { t } = useTranslation();

    const { data, loading, error, mutate } = useSWRFix<ActivityResponse>({
        key: `activity-log`,
        fetcher: async () => {
            const response = await getActivity();
            if (!response) throw new Error(t('Failed to fetch banner details'));
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