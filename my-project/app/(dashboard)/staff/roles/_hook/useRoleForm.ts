import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { postRole } from "../_api/rolesApi";
import { RolePayload, RoleDto } from "../add/_types/roleTypes";
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

export type RoleFormValues = z.infer<typeof roleSchema>;

export default function useRoleForm() {
  const { trigger, isMutating } = useSWRMutation(
    "createRole",
    async (_: string, { arg }: { arg: RolePayload }) => {
      const newRole = await postRole(arg);
      mutate("roles", (current: RoleDto[] = []) => [...current, newRole], false);
      mutate("roles");
      return newRole;
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message });
        console.error("Role creation error:", error);
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
    watch,
    control,
  } = useForm<RoleFormValues>({
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

  const onSubmit = async (values: RoleFormValues) => {
    try {
      const result = await trigger(values);
      if (result) {
        showSuccess("Role created successfully!");
        reset();
      }
    } catch (error: any) {
      showError({ message: error.message });
      console.error("Role creation error:", error);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    register,
    setValue,
    watch,
    control,
    fields,
    append,
    remove,
  };
} 