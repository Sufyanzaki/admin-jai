import { ProfileResponse } from "@/app/shared-types/auth";
import { MemberProfile } from "@/app/shared-types/member";
import { getRequest } from "@/shared-lib";

export type accpetedLikesResponse = {
    status: 'success' | 'error';
    data: MemberProfile;
}

export async function getLikesRecieved(): Promise<accpetedLikesResponse> {
    return await getRequest<accpetedLikesResponse>({
        url: "/users/like/accepted",
        useAuth: true,
    });
}