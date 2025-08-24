import { useSWRFix } from "@/shared-lib";
import { getDashboardStats } from "@/app/admin/(dashboard)/_api/getDashbaord";
import { DashboardStats } from "@/app/admin/(dashboard)/_types/dashboard";
import { useTranslation } from "react-i18next";

export const useDashboard = () => {
    const { t } = useTranslation();
    const { data, loading, error, mutate } = useSWRFix<DashboardStats>({
        key: 'dashboard-stats',
        fetcher: async () => {
            const response = await getDashboardStats();
            if (!response) {
                throw new Error(t('Failed to fetch dashboard statistics'));
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