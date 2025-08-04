"use client"

import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getRoleById } from "../_api/rolesApi";
import { RoleDto } from "../add/_types/roleTypes";

export default function useRoleById(id: number | string) {
  const { data, loading, error, mutate } = useSWRFix<RoleDto>({
    key: id ? `role-${id}` : '',
    fetcher: () => getRoleById(id),
    enabled: !!id,
  });

  return {
    role: data,
    loading,
    error,
    mutate,
  };
} 