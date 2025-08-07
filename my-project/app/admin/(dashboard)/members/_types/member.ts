import {MemberProfile} from "@/app/shared-types/member";

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
  users: MemberProfile[];
}; 