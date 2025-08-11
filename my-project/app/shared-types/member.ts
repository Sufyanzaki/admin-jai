export type MemberLocation = {
    city: string;
    state: string;
    country: string;
    id: string;
}

export type MemberEducation = {
    id: number;
    userId: number;
    primarySpecialization: string;
    secondarySpecialization: string;
    qualifications: string;
    experience: string;
    education: string;
    certifications: string;
    department: string;
    position: string;
}

export type MemberHobbiesInterests = {
    id: string;
    userId: string;
    sports: string;
    music: string;
    kitchen: string;
    reading: string;
    tvShows: string;
}


export type MemberPersonalityBehavior = {
    id: number;
    userId: number;
    simple: boolean;
    musical: boolean;
    conservative: boolean;
    calm: boolean;
    pragmatic: boolean;
    streetSmart: boolean;
    subdued: boolean;
    demanding: boolean;
    narcissistic: boolean;
    eccentric: boolean;
    spiritual: boolean;
    talkative: boolean;
    prettySmart: boolean;
    undemanding: boolean;
    altruistic: boolean;
    stubborn: boolean;
    selfish: boolean;
    sporty: boolean;
    modest: boolean;
    humorous: boolean;
    romantic: boolean;
    serious: boolean;
    sharp: boolean;
    caring: boolean;
    spontaneously: boolean;
    freethinking: boolean;
    adventurous: boolean;
    sensual: boolean;
    straightForward: boolean;
    intellectual: boolean;
    embarrassed: boolean;
    exuberant: boolean;
    worldly: boolean;
    artistic: boolean;
    sluggish: boolean;
    compulsive: boolean;
    relaxed: boolean;
}

export type MemberPartnerExpectations = {
    id: number;
    userId: number;
    origin: string;
    lookingFor: string;
    length: string;
    religion: string;
    relationshipStatus: string;
    education: string;
    weight: string;
    smoke: string;
    drinking: string;
    goingOut: string;
    ageFrom: number;
    ageTo: number;
    country: string;
    city: string;
    state: string;
}

export type MemberLifeStyle = {
    id: string;
    userId: string;
    smoke: string;
    drinking: string
    goingOut: string
    exercise: string
    diet: string
    pets: string;
    travel: string
    socialMedia: string
    workLifeBalance: string
    nightLife: string;
    primaryHobby: string;
}

export type MemberLanguage = {
    id: string;
    userId: string;
    motherTongue: string;
    knownLanguages: string;
}

export type MemberPhysicalAppearance = {
    id: number;
    userId: number;
    height: string;
    eyeColor: string;
    hairColor: string;
    bodyType: string;
    weight: string;
    appearance: string;
    clothing: string;
    intelligence: string;
    language: string;
}


export type MemberProfile = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    dob: string;
    role: 'ADMIN' | 'CLIENT' | string;
    otp: string | null;
    otpExpiresAt: string | null;
    isActive: boolean;
    isDeleted: boolean;
    image: string;
    phone: string;
    department: string | null;
    origin: string;
    gender: 'Male' | 'Female' | 'Other' | string;
    age: number;
    relationshipStatus: 'Single' | 'Married' | 'Divorced' | string;
    lookingFor: string | null;
    children: string;
    religion: string;
    shortDescription: string;
    isPremium: boolean;
    createdAt: string;
    updatedAt: string;

    route: null | string;

    roleId: number | null;
    educationCareer: MemberEducation | null;
    personalityBehavior: MemberPersonalityBehavior | null;
    partnerExpectation: MemberPartnerExpectations | null;

    lifestyle: MemberLifeStyle | null;
    hobbiesInterests: MemberHobbiesInterests | null;
    language: MemberLanguage | null;
    living: MemberLocation | null;
    physicalAppearance: MemberPhysicalAppearance | null;
}
