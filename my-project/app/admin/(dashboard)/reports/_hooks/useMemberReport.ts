import {useSWRFix} from "@/shared-lib";
import {getMemberReport, MemberProps} from "@/app/admin/(dashboard)/reports/_api/reportApi";
import {MemberResponseDto} from "@/app/admin/(dashboard)/reports/_types/report";

export const useMemberReport = (params: MemberProps) => {
    const { data, loading, error, mutate, refetch } = useSWRFix<MemberResponseDto>({
        key: `member-report`,
        fetcher: async () => {
            const response = await getMemberReport(params);
            if (!response) {
                throw new Error('Failed to fetch details');
            }
            return response;
        }
    });

    return {
        memberReport: data,
        memberReportLoading: loading,
        refetch,
        error,
        mutate
    };
};