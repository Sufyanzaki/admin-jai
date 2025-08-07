import {MemberProfile} from "@/app/shared-types/member";

export type DashboardStats = {
    totalMembers: number;
    premiumMembers: number;
    freeMembers: number;
    todayMembers: number;
    monthlyRegistrations: MonthlyRegistration[];
    todayRegisteredUsers: MemberProfile[];
}

export type MonthlyRegistration = {
    month: string;
    count: number;
}