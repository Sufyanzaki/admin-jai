import { useSWRFix } from "@/shared-lib";
import { DetailReportFilters, getDetailReport } from "@/app/admin/(dashboard)/reports/_api/reportApi";
import { DetailedResponseDto } from "@/app/admin/(dashboard)/reports/_types/report";
import { useTranslation } from "react-i18next";

export const useDetailReport = (params: DetailReportFilters) => {
    const { t } = useTranslation();

    const key = `analytics-${JSON.stringify(params || {})}`;

    const { data, loading, error, mutate, refetch } = useSWRFix<DetailedResponseDto>({
        key,
        fetcher: async () => {
            const response = await getDetailReport(params);
            if (!response) {
                throw new Error(t('Failed to fetch banner details'));
            }
            return response;
        }
    });

    return {
        detailReport: data,
        detailReportLoading: loading,
        error,
        refetch,
        mutate
    };
};