import { MemberProfile } from "@/app/shared-types/member";
import { postRequest } from "@/shared-lib";

export type unblockUser = {
    blockedUserId: number
}


export type unblockProfilesResponse = {
    status: 'success' | 'error';
    data: MemberProfile;
}

export async function unblockProfiles(payload: unblockUser): Promise<unblockProfilesResponse> {
    const r = await postRequest<unblockUser>({
        url: "/users/unblock",
        data: payload,
        useAuth: true,
    });
    return r.response;
} 