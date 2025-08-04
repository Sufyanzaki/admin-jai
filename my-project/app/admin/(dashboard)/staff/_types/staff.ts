export type StaffRole = "ADMIN" | "MODERATOR" | string;

export interface StaffAllow {
  id: string;
  name: string;
  description: string | null;
  isDefault: boolean;
  isActive: boolean;
  catagory: string | null;
}

export interface StaffMember {
  id: string;
  username: string | null;
  email: string;
  firstName: string;
  lastName: string;
  dob: string | null;
  role: StaffRole;
  password: string;
  otp: string;
  otpExpiresAt: string;
  isActive: boolean;
  image: string | null;
  phone: string | null;
  department: string | null;
  location: string | null;
  origin: string | null;
  gender: string | null;
  age: number | null;
  relationshipStatus: string | null;
  lookingFor: string | null;
  children: string | null;
  religion: string | null;
  shortDescription: string | null;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  roleId: string;
  allow: StaffAllow;
}

export interface StaffListResponse {
  page: number;
  limit: number;
  totalStaff: number;
  activeStaffCount: number;
  inactiveStaffCount: number;
  countByRoles: Record<string, number>;
  staffMembers: StaffMember[];
}