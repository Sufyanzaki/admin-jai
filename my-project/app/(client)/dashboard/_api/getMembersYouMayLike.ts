import { ProfileResponse } from "@/app/shared-types/auth";
import { getRequest } from "@/shared-lib";

export async function getMembersYouMayLike(): Promise<ProfileResponse[]> {
    return await getRequest<ProfileResponse[]>({
        url: "/you-may-like",//dummy
        useAuth: true,
    });
}