import { getRequest } from "@/admin-utils";
import type { StaffListResponse, StaffMember } from "../_types/staff";

export async function getStaffMembers(params?: { page?: number; limit?: number; search?: string; allow?: string; isActive?: boolean }) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.allow) queryParams.append('allow', params.allow);
  if (typeof params?.isActive === "boolean") queryParams.append('isActive', params.isActive ? "true" : "false");

  const query = queryParams.toString() ? `?${queryParams.toString()}` : "";

  return await getRequest<StaffListResponse>({
    url: `users/staff/staff-members${query}`,
    useAuth: true,
  });
}

export async function getStaffMember(id: string) {
  return await getRequest<StaffMember>({
    url: `users/${id}`,
    useAuth: true,
  });
}