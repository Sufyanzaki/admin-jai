import {getRequest} from "@/shared-lib";
import {
    AnalyticsResponseDto,
    DetailedResponseDto,
    MemberResponseDto, ReportResponse
} from "@/app/admin/(dashboard)/reports/_types/report";
import {RevenueDataDto} from "@/app/admin/(dashboard)/payments/_types/payment";

export type AnalyticsFilters = {
    startDate?: string;
    endDate?: string;
    relationStatus?: string;
}


export async function getAnalytics(filters?: AnalyticsFilters): Promise<AnalyticsResponseDto> {
    const queryParams = new URLSearchParams();

    if (filters?.startDate) queryParams.append('startDate', filters.startDate);
    if (filters?.endDate) queryParams.append('endDate', filters.endDate);


    if (filters?.relationStatus && filters.relationStatus !== "all") {
        queryParams.append('role', filters.relationStatus);
    }


    const url = queryParams.toString()
        ? `users/analytics-report?${queryParams.toString()}`
        : 'users/analytics-report';

    return await getRequest({
        url,
        useAuth: true
    });
}

export type IncomeFilters = {
    startDate?: string;
    endDate?: string;
    packageId?: string;
    gender?: string;
}

export async function getPackagesReport(filters:IncomeFilters): Promise<RevenueDataDto> {

    const queryParams = new URLSearchParams();

    if (filters?.startDate) queryParams.append('startDate', filters.startDate);
    if (filters?.endDate) queryParams.append('endDate', filters.endDate);

    if (filters?.packageId && filters.packageId !== "all") {
        queryParams.append('packageId', filters.packageId);
    }

    if (filters?.gender && filters.gender !== "all") {
        queryParams.append('gender', filters.gender);
    }

    const url = queryParams.toString()
        ? `users/packages?${queryParams.toString()}`
        : 'users/packages';

    return await getRequest({
        url,
        useAuth: true
    });
}

export type DetailReportFilters = {
    startDate?: string;
    endDate?: string;
    status?: string;
    role?: string;
    origin?: string;
    religion?: string;
    relationshipStatus?: string;
}

export async function getDetailReport(filters?: DetailReportFilters): Promise<DetailedResponseDto> {
    const queryParams = new URLSearchParams();

    if (filters?.startDate) queryParams.append('startDate', filters.startDate);
    if (filters?.endDate) queryParams.append('endDate', filters.endDate);

    if (filters?.role && filters.role !== "all") {
        queryParams.append('role', filters.role);
    }

    if (filters?.status && filters.status !== "all") {
        queryParams.append('status', filters.status);
    }

    const url = queryParams.toString()
        ? `users/detail-report?${queryParams.toString()}`
        : 'users/detail-report';

    return await getRequest({
        url,
        useAuth: true
    });
}

export type MemberProps = {
    startDate?: string;
    endDate?: string;
    role?: string;
    status?: string;
}

export async function getMemberReport(filters?: MemberProps): Promise<MemberResponseDto> {

    const queryParams = new URLSearchParams();

    if (filters?.startDate) queryParams.append('startDate', filters.startDate);
    if (filters?.endDate) queryParams.append('endDate', filters.endDate);

    if (filters?.role && filters.role !== "all") {
        queryParams.append('role', filters.role);
    }

    if (filters?.status && filters.status !== "all") {
        queryParams.append('status', filters.status);
    }
    const url = queryParams.toString()
        ? `users/member-report?${queryParams.toString()}`
        : 'users/member-report';

    return await getRequest({
        url,
        useAuth: true
    });
}

export const getReportSummary = async (): Promise<ReportResponse> => {
    return await getRequest({
        url: 'users/reports-summary',
        useAuth: true
    });
}