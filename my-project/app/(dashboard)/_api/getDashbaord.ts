import {getRequest} from "@/admin-utils";
import {DashboardStats} from "@/app/(dashboard)/_types/dashboard";

export async function getDashboardStats(): Promise<DashboardStats | undefined> {
    return await getRequest<DashboardStats>({
        url: 'users/dashboard/stats',
        useAuth: true
    });
}