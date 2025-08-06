import {UserDto} from "@/app/shared-types/auth";

export type DashboardStats = {
    totalMembers: number;
    premiumMembers: number;
    freeMembers: number;
    todayMembers: number;
    monthlyRegistrations: MonthlyRegistration[];
    todayRegisteredUsers: UserDto[];
}

export type MonthlyRegistration = {
    month: string;
    count: number;
}