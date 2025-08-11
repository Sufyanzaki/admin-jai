import { ProfileResponse } from "@/app/shared-types/auth";
import { MemberProfile } from "@/app/shared-types/member";
import { getRequest } from "@/shared-lib";

export type mayLikeResponse = {
    status: 'success' | 'error';
    data: MemberProfile;
}

export async function getMembersYouMayLike(): Promise<mayLikeResponse> {
    return await getRequest<mayLikeResponse>({
        url: "users/may-like",
        useAuth: true,
    });
}