export interface MemberLocation {
    city: string;
    state: string;
    country: string;
    id: string;
}

export type  MemberPartnerExpectations = {
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
