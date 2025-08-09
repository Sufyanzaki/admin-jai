import { MemberProfile } from "@/app/shared-types/member";
import { getRequest } from "@/shared-lib";

export type blockedProfilesResponse = {
    status: 'success' | 'error';
    data: MemberProfile;
}

export async function getBlockedProfiles(): Promise<blockedProfilesResponse> {
    return await getRequest<blockedProfilesResponse>({
        url: "/users/blocked",
        useAuth: true,
    });
}