export type Member = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  role: string;
  otp: string | null;
  otpExpiresAt: string | null;
  isActive: boolean;
  image: string;
  phone: string;
  department: string;
  location: string;
  origin: string;
  gender: string;
  age: number;
  relationshipStatus: string;
  lookingFor: string | null;
  children: boolean;
  religion: string;
  shortDescription: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  educationCareer: any | null;
  personalityBehavior: any | null;
  partnerExpectation: any | null;
  lifestyle: any | null;
  hobbiesInterests: any | null;
  language: any | null;
  living: any | null;
  physicalAppearance: any | null;
};

export type MemberStats = {
  total: number;
  active: number;
  inactive: number;
  premium: number;
  percentages: {
    active: string;
    inactive: string;
    premium: string;
  };
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type GetAllMembersResponse = {
  stats: MemberStats;
  pagination: Pagination;
  users: Member[];
}; 