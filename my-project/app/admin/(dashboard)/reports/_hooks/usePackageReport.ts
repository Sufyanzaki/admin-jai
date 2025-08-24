import { useSWRFix } from "@/shared-lib";
import { getPackagesReport, IncomeFilters } from "@/app/admin/(dashboard)/reports/_api/reportApi";
import { RevenueDataDto } from "@/app/admin/(dashboard)/payments/_types/payment";
import { useTranslation } from "react-i18next";

export const usePackageReport = (params: IncomeFilters) => {
    const { t } = useTranslation();

    const key = `pkg-report-${JSON.stringify(params || {})}`;

    const { data, loading, error, mutate, refetch } = useSWRFix<RevenueDataDto>({
        key,
        fetcher: async () => {
            const response = await getPackagesReport(params);
            if (!response) {
                throw new Error(t('Failed to fetch details'));
            }
            return response;
        }
    });

    return {
        packagesReport: data,
        packageReportLoading: loading,
        refetch,
        error,
        mutate
    };
};