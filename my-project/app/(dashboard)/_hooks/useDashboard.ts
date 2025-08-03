import {useSWRFix} from "@/admin-utils/lib/useSwrFix";
import {getDashboardStats} from "@/app/(dashboard)/_api/getDashbaord";
import {DashboardStats} from "@/app/(dashboard)/_types/dashboard";

export const useDashboard = () => {
    const { data, loading, error, mutate } = useSWRFix<DashboardStats>({
        key: 'dashboard-stats',
        fetcher: async () => {
            const response = await getDashboardStats();
            if (!response) {
                throw new Error('Failed to fetch dashboard statistics');
            }
            return response;
        }
    });

    return {
        stats: data,
        statsLoading: loading,
        error,
        mutate
    };
};