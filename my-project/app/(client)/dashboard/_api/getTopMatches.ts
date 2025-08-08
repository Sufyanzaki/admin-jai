import { ProfileResponse } from "@/app/shared-types/auth";
import { getRequest } from "@/shared-lib";

export async function getTopMatches(): Promise<ProfileResponse[]> {
    return await getRequest<ProfileResponse[]>({
        url: "/top-matches",//dummy
        useAuth: true,
    });
}