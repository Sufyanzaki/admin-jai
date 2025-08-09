import { MemberProfile } from "@/app/shared-types/member";
import { getRequest } from "@/shared-lib";

export type unblockProfilesResponse = {
    status: 'success' | 'error';
    data: MemberProfile;
}

export async function unblockProfiles(): Promise<unblockProfilesResponse> {
    return await getRequest<unblockProfilesResponse>({
        url: "/users/unblock",
        useAuth: true,
    });
}