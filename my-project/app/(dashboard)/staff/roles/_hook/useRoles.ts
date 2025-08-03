import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getAllRoles } from "../_api/rolesApi";
import { RoleDto } from "../add/_types/roleTypes";

export default function useRoles() {
  const { data, loading, error, mutate } = useSWRFix<RoleDto[]>({
    key: "roles",
    fetcher: getAllRoles,
  });

  return {
    roles: data,
    loading,
    error,
    mutate,
  };
} 