import {MemberProfile} from "@/app/shared-types/member";
import {getRequest} from "@/shared-lib";

export type TodayMatchesResponse = {
    status: 'success' | 'error';
    data: MemberProfile[];
}

export async function getTodayMatches(): Promise<TodayMatchesResponse> {
    return await getRequest<TodayMatchesResponse>({
        url: "users/today-matches",
        useAuth: true,
    });
}