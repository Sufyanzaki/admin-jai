import { ProfileResponse } from "@/app/shared-types/auth";
import { MemberProfile } from "@/app/shared-types/member";
import { getRequest } from "@/shared-lib";

export type TodayMatchesResponse = {
    status: 'success' | 'error';
    data: MemberProfile;
}

export async function getBlockedUsers(): Promise<TodayMatchesResponse> {
    return await getRequest<TodayMatchesResponse>({
        url: "/users/blocked",
        useAuth: true,
    });
}