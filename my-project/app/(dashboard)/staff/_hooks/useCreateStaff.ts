import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createStaffMember, CreateStaffPayload } from "../_api/createStaff";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { imageUpload } from "@/admin-utils/utils/imageUpload";
import useSWRMutation from "swr/mutation";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { GetAllMembersResponse, Member } from "../../members/_types/member";
import { StaffListResponse, StaffMember } from "../_types/staff";

const createStaffSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(6, "Password is required and must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.string().min(1, "Role is required"),
  image: z.any().optional(),
  phone: z.string().optional(),
  roleId: z.string().min(1, "Role is required"),
});

export type CreateStaffFormValues = z.infer<typeof createStaffSchema>;

export function useCreateStaffForm() {

  const { mutate:globalMutate } = useSWRConfig();

  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
    control,
    watch,
  } = useForm<CreateStaffFormValues>({
    resolver: zodResolver(createStaffSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "MODERATOR",
      image: "",
      phone: "",
      roleId: "",
    },
    mode: "onBlur",
  });

  // SWR mutation trigger for create
  const { trigger, isMutating } = useSWRMutation(
    "createStaffMember",
    async (_: string, { arg }: { arg: CreateStaffPayload }) => {
      try {
        const result = await createStaffMember(arg);
        return result;
      } catch (err: any) {
        throw err;
      }
    },
    {
      onError: (error: any) => {
        setError(error?.message || "Failed to create staff member");
        showError({ message: error?.message || "Failed to create staff member" });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: CreateStaffFormValues, callback?: (data: any) => void) => {
    setError(null);
    
    try {
      // Handle image upload if image is a File
      let imageUrl = values.image;
      if (values.image instanceof File) {
        imageUrl = await imageUpload(values.image);
      }

      // Prepare payload for API
      const payload: CreateStaffPayload = {
        ...values,
        image: imageUrl || undefined,
        phone: values.phone || undefined,
      };

      const result = await trigger(payload);

      // Update cache after successful creation
      globalMutate(
        "staff-members",
        (current: StaffListResponse | undefined) => {
          if (!current) return current;

          const updatedUser = result.response as StaffMember;
          const staffMembers = [updatedUser, ...current.staffMembers];

          return {
            ...current,
            staffMembers,
            totalStaff: current.totalStaff + 1,
            activeStaffCount: current.activeStaffCount + 1,
            countByRoles: {
              ...current.countByRoles,
              [updatedUser.role]: (current.countByRoles?.[updatedUser.role] || 0) + 1,
            },
          };
        },
        false
      );

      showSuccess("Staff member created successfully!");
      callback?.(result);
      reset();
    } catch (error: any) {
      setError(error?.message || "Failed to create staff member");
      showError({ message: error?.message || "Failed to create staff member" });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    setValue,
    reset,
    control,
    watch,
    onSubmit,
    error,
    trigger,
  };
}