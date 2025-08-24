"use client"

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useRoleById from "./useRoleById";
import { RoleDto, Permission } from "../add/_types/roleTypes";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { patchRole } from "../_api/rolesApi";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { useTranslation } from "react-i18next";
import { mutate } from "swr";


export default function useEditRoleForm(id: number | string) {
  const { t } = useTranslation();
  const { role, loading, error } = useRoleById(id);

  const permissionSchema = z.object({
    module: z.string().min(1, t("Module name is required")),
    canView: z.boolean(),
    canCreate: z.boolean(),
    canEdit: z.boolean(),
    canDelete: z.boolean(),
  });

  const roleSchema = z.object({
    name: z.string().min(1, t("Role name is required")),
    description: z.string().min(1, t("Description is required")),
    isDefault: z.boolean().default(false),
    permissions: z.array(permissionSchema).min(1, t("At least one permission is required")),
  });

  type EditRoleFormValues = z.infer<typeof roleSchema>;

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
    reset,
    setValue,
  } = useForm<EditRoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      isDefault: false,
      permissions: [
        { module: "", canView: false, canCreate: false, canEdit: false, canDelete: false },
      ],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "permissions",
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
  showError({ message: t(error.message) });
        console.error("Role update error:", error);
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: EditRoleFormValues) => {
    const result = await trigger(values);
    if (result) {
  showSuccess(t("Role updated successfully!"));
    }
  };

  return {
    handleSubmit,
    control,
    errors,
    isSubmitting: isSubmitting || isMutating,
    reset,
    watch,
    loading,
    setValue,
    error,
    onSubmit,
    fields, append, remove
  };
} 