import {getRequest} from "@/shared-lib";
import {MemberProfile} from "@/app/shared-types/member";

export async function getBlockedProfiles(): Promise<MemberProfile[]> {
    return await getRequest({
        url: "users/blocked",
        useAuth: true,
    });
}