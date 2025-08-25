import {MemberProfile} from "@/app/shared-types/member";
import {getRequest} from "@/shared-lib";

export type MayLikeResponse = {
    status: 'success' | 'error';
    data: MemberProfile[];
}

export async function getMembersYouMayLike(): Promise<MayLikeResponse> {
    return await getRequest<MayLikeResponse>({
        url: "users/may-like",
        useAuth: true,
    });
}