type GenderDistributionItem = {
    gender: string;
    count: number;
    percentage: string;
};

type AgeDistributionItem = {
    age: number;
    count: number;
    percentage: string;
};

type CountryDistributionItem = {
    country: string;
    count: number;
    percentage: string;
};

type TopCity = {
    _count: {
        city: number;
    };
    city: string;
};

type PageViews = {
    pageLink: string,
    count: 2
}

type AnalyticsData = {
    filters: Record<string, unknown>;
    totalUsers: number;
    userGrowthRate: string;
    newSignups: number;
    totalMatches: number;
    totalMessages: number;
    genderDistribution: GenderDistributionItem[];
    ageDistribution: AgeDistributionItem[];
    countryDistribution: CountryDistributionItem[];
    topCities: TopCity[];
    pagesViews: PageViews[];
};

export type AnalyticsResponseDto = {
    success: boolean;
    data: AnalyticsData;
};

//member report

type Member = {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
    createdAt: string;
    role: string;
    isActive: boolean;
    isDeleted: boolean;
}

type RoleCount = {
    role: string;
    count: number;
}

type StatusBreakdown = {
    active: number;
    inactive: number;
    deleted: number;
}

type MemberDataDto = {
    filters: Record<string, unknown>;
    totalMembers: number;
    membersLastMonth: number;
    membersThisMonth: number;
    growthRate: string;
    activeMembers: number;
    rolesWithNames: RoleCount[];
    statusBreakdown: StatusBreakdown;
    lastTenMembers: Member[];
}

export type MemberResponseDto = {
    success: boolean;
    data: MemberDataDto;
}

//detailedReports types

type Count = {
    [key: string]: number;
}

type RelationshipPercentage = {
    status: string;
    count: number;
    percentage: string;
}

type TopOrigin = {
    _count: {
        origin: number;
    };
    origin: string;
}

type ReligionGroup = {
    _count: {
        religion: number;
    };
    religion: string;
}

type CareerGroup = {
    _count: {
        primarySpecialization: number;
    };
    primarySpecialization: string;
}

type LastTenAccount = {
    id: number;
    username: string | null;
    email: string;
    firstName: string | null;
    lastName: string | null;
    dob: string | null;
    role: string;
    lastLogin: string | null;
    password: string;
    otp: string | null;
    otpExpiresAt: string | null;
    isActive: boolean;
    isDeleted: boolean;
    image: string | null;
    phone: string | null;
    department: string | null;
    location: string | null;
    origin: string | null;
    gender: string | null;
    age: number | null;
    messageCount: number;
    relationshipStatus: string | null;
    lookingFor: string | null;
    children: string | null;
    religion: string | null;
    shortDescription: string | null;
    isPremium: boolean;
    packageStart: string | null;
    packageEnd: string | null;
    createdAt: string;
    updatedAt: string;
    route: string | null;
    roleId: number | null;
}

type DetailedData = {
    filters: Record<string, unknown>;
    totalLogins: number;
    completedProfiles: number;
    deletedProfiles: number;
    neverLoggedIn: number;
    relationshipPercentages: RelationshipPercentage[];
    top5Origins: TopOrigin[];
    religionGroup: ReligionGroup[];
    careerGroup: CareerGroup[];
    lastTenAccounts: LastTenAccount[];
}

export type DetailedResponseDto = {
    success: boolean;
    data: DetailedData;
}