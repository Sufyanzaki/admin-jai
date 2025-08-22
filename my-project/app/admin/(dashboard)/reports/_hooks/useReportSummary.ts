import {useSWRFix} from "@/shared-lib";
import {getReportSummary} from "@/app/admin/(dashboard)/reports/_api/reportApi";
import {ReportResponse} from "@/app/admin/(dashboard)/reports/_types/report";

export const useReportSummary = () => {

    const { data, loading, error, mutate, refetch } = useSWRFix<ReportResponse>({
        key: 'report-summary',
        fetcher: async () => {
            const response = await getReportSummary();
            if (!response) throw new Error('Failed to fetch details');
            return response;
        }
    });

    return {
        summary: data?.data,
        summaryLoading: loading,
        refetch,
        error,
        mutate
    };
};