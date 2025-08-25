import { useSWRFix } from "@/shared-lib";
import {getMembersYouMayLike, MayLikeResponse} from "../_api/getMembersYouMayLike";
import { useTranslation } from "react-i18next";

export const useMayLike = () => {
    const { t } = useTranslation();

    const { data, loading, error, mutate } = useSWRFix<MayLikeResponse>({
        key: ' may-like',
        fetcher: async () => {
            const response = await getMembersYouMayLike();
            if (!response) {
                throw new Error(t('Failed to fetch dashboard statistics'));
            }
            return response;
        }
    });

    return {
        mayLike: data?.data,
        mayLikeLoading: loading,
        error,
        mutate
    };
};