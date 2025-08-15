import {MemberProfile} from "@/app/shared-types/member";

export interface SearchApiResponse {
    status: string;
    data: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        results: MemberProfile[];
    };
}
