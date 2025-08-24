import { useSWRFix } from "@/shared-lib";
import { ApiResponseDto } from "@/app/(client)/dashboard/notifications/_types/notification";
import { getLikesAccepted } from "../_api/likes";
import { useTranslation } from "react-i18next";

export const useLikesAccepted = () => {
    const { t } = useTranslation();
    const { data, loading, error, mutate } = useSWRFix<ApiResponseDto>({
        key: 'likes-received',
        fetcher: async () => {
            const response = await getLikesAccepted();
            if (!response) {
                throw new Error(t('Failed to fetch likes received'));
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