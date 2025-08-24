import {useSWRFix} from "@/shared-lib";
import { useTranslation } from "react-i18next";
import {getAllPayments} from "@/app/shared-api/paymentApi";
import {RevenueDataDto} from "@/app/admin/(dashboard)/payments/_types/payment";

export const usePayments = () => {
    const { t } = useTranslation();

    const { data, loading, error, mutate } = useSWRFix<RevenueDataDto>({
        key: `payments`,
        fetcher: async () => {
            const response = await getAllPayments();
            if (!response) {
                throw new Error(t('Failed to fetch banner details'));
            }
            return response;
        }
    });

    return {
        payments: data,
        paymentLoading: loading,
        error,
        mutate
    };
};