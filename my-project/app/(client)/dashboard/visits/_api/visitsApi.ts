import {getRequest} from "@/shared-lib";
import {MemberProfile} from "@/app/shared-types/member";

export type VisitResponse = {
    status: string;
    data: MemberProfile[]
}

export async function getVisits(): Promise<VisitResponse> {
    return await getRequest({
        url: `users/profile-visitors`,
        useAuth: true
    })
}