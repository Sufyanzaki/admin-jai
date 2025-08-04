"use client"

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useRoleById from "./useRoleById";
import { RoleDto, Permission, RolePayload } from "../add/_types/roleTypes";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { patchRole } from "../_api/rolesApi";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { mutate } from "swr";

const permissionSchema = z.object({
  module: z.string().min(1, "Module name is required"),
  canView: z.boolean(),
  canCreate: z.boolean(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
});

const roleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  description: z.string().min(1, "Description is required"),
  isDefault: z.boolean().default(false),
  permissions: z.array(permissionSchema).min(1, "At least one permission is required"),
});

export type EditRoleFormValues = z.infer<typeof roleSchema>;

export default function useEditRoleForm(id: number | string) {
  const { role, loading, error } = useRoleById(id);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<EditRoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      isDefault: false,
      permissions: [],
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (role && Array.isArray(role.permissions)) {
      reset({
        name: role.name || "",
        description: role.description || "",
        isDefault: role.isDefault || false,
        permissions: role.permissions as Permission[],
      });
    }
  }, [role, reset]);

  const idStr = String(id);
  const { trigger, isMutating } = useSWRMutation(
    `updateRole-${idStr}`,
    async (_: string, { arg }: { arg: EditRoleFormValues }) => {
      const updated = await patchRole(idStr, arg);
      mutate("roles", (current: RoleDto[] = []) =>
        current.map((r) => (r.id === updated.id ? updated : r)), false);
      mutate("roles");
      return updated;
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message });
        console.error("Role update error:", error);
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: EditRoleFormValues) => {
    const result = await trigger(values);
    if (result) {
      showSuccess("Role updated successfully!");
    }
  };

  return {
    handleSubmit,
    control,
    errors,
    isSubmitting: isSubmitting || isMutating,
    reset,
    loading,
    error,
    onSubmit,
  };
} 