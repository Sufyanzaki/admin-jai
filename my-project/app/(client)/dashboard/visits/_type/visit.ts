import {MemberProfile} from "@/app/shared-types/member";

export type VisitorBlockDto = {
    id: number;
    visitorId: number;
    visitedId: number;
    visitedAt: string;
    visitor: MemberProfile;
}

export type VisitResponseDto = {
    data: VisitorBlockDto[];
}