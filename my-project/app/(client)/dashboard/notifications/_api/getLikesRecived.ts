import { ProfileResponse } from "@/app/shared-types/auth";
import { MemberProfile } from "@/app/shared-types/member";
import { getRequest } from "@/shared-lib";

export type likesRecievedResponse = {
    status: 'success' | 'error';
    data: MemberProfile;
}

export async function getLikesRecieved(): Promise<likesRecievedResponse> {
    return await getRequest<likesRecievedResponse>({
        url: "/users/like/received",
        useAuth: true,
    });
}