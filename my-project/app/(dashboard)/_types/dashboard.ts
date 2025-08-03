import {UserDto} from "@/app/(dashboard)/profile/_types/profile-types";

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