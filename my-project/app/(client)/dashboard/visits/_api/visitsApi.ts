import {getRequest} from "@/shared-lib";
import {MemberProfile} from "@/app/shared-types/member";
import {VisitResponseDto} from "@/app/(client)/dashboard/visits/_type/visit";

export type VisitResponse = {
    status: string;
    data: MemberProfile[]
}

export async function getVisits(): Promise<VisitResponseDto> {
    return await getRequest({
        url: `users/profile-visitors`,
        useAuth: true
    })
}