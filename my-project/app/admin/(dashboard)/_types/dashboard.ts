import {MemberProfile} from "@/app/shared-types/member";

export type DashboardStats = {
    totalMembers: number;
    premiumMembers: number;
    freeMembers: number;
    todayMembers: number;
    membersLastMonth: number;
    membersThisMonth: number;
    monthlyRegistrations: MonthlyRegistration[];
    todayRegisteredUsers: MemberProfile[];
    growthRateMessage: string;
}

export type MonthlyRegistration = {
    month: string;
    count: number;
}