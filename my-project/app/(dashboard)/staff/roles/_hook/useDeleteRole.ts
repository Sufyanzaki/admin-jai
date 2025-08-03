import useSWRMutation from "swr/mutation";
import { deleteRole } from "../_api/rolesApi";
import { mutate } from "swr";

export default function useDeleteRole() {
  const { trigger, isMutating, error, data } = useSWRMutation(
    "deleteRole",
    async (_: string, { arg }: { arg: number | string }) => {
      await deleteRole(arg);
      mutate("roles", (current: any[] = []) => current.filter(role => role.id !== arg), false);
      mutate("roles");
      return arg;
    }
  );

  return {
    deleteRole: trigger,
    isDeleting: isMutating,
    error,
    success: !!data,
  };
} 