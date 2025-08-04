import useSWR from "swr";
import { getStaffMembers } from "../_api/getStaff";
import type { StaffListResponse } from "../_types/staff";

export function useStaffMembers(params?: { page?: number; limit?: number; search?: string; role?: string; isActive?: boolean }) {
  const { data, error, isLoading, mutate } = useSWR<StaffListResponse>(
    ["staff-members", params],
    () => getStaffMembers(params)
  );

  return {
    staffList: data,
    loading: isLoading,
    error,
    mutate,
  };
}