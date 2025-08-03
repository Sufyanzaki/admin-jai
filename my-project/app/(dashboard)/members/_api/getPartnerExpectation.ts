import {getRequest} from "@/admin-utils";

export type PartnerExpDto = {
    id: number;
    userId: number;
    origin: string;
    lookingFor: string;
    length: string;
    religion: string;
    relationshipStatus: string;
    education: string;
    weight: string;
    smoke: boolean;
    drinking: boolean;
    goingOut: boolean;
    ageFrom: number;
    ageTo: number;
    country: string;
    city: string;
    state: string;
}


export async function getPartnerExpectations(id: string): Promise<PartnerExpDto | undefined> {
    return await getRequest({
        url: `users/${id}/partner-expectation`,
        useAuth: true
    })
}