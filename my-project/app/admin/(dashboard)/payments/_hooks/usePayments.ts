import {useSWRFix} from "@/shared-lib";
import {getAllPayments} from "@/app/shared-api/paymentApi";
import {RevenueDataDto} from "@/app/admin/(dashboard)/payments/_types/payment";

export const usePayments = () => {

    const { data, loading, error, mutate } = useSWRFix<RevenueDataDto>({
        key: `payments`,
        fetcher: async () => {
            const response = await getAllPayments();
            if (!response) {
                throw new Error('Failed to fetch banner details');
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