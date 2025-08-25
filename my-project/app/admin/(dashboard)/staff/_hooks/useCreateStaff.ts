"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createStaffMember } from "../_api/staffApi";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { imageUpload } from "@/admin-utils/utils/imageUpload";
import useSWRMutation from "swr/mutation";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { StaffListResponse, StaffMemberDto } from "../_types/staff";
import { useTranslation } from "react-i18next";



export function useCreateStaffForm() {
  const { t } = useTranslation();


  const createStaffSchema = z.object({
    email: z.string().min(1, t("Email is required")).email(t("Please enter a valid email address")),
    password: z.string().min(6, t("Password is required and must be at least 6 characters")),
    firstName: z.string().min(1, t("First name is required")),
    lastName: z.string().min(1, t("Last name is required")),
    role: z.string().min(1, t("Role is required")),
    image: z.any().optional(),
    phone: z.string().optional(),
    roleId: z.string().min(1, t("Role is required")),
  });

  type CreateStaffFormValues = z.infer<typeof createStaffSchema>;

  const { mutate: globalMutate } = useSWRConfig();

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
    async (_: string, { arg }: { arg: Partial<StaffMemberDto> }) => {
      try {
        const result = await createStaffMember(arg);
        return result;
      } catch (err: unknown) {
        if (err instanceof Error) {
          throw err;
        }
        throw new Error("Unknown error occurred");
      }
    },
    {
      onError: (error: unknown) => {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to create staff member";
        setError(message);
  showError({ message: t(message) });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: CreateStaffFormValues, callback?: () => void) => {
    setError(null);

    try {
      let imageUrl = values.image;
      if (values.image instanceof File) {
        imageUrl = await imageUpload(values.image);
      }

      const payload = {
        ...values,
        image: imageUrl || undefined,
        phone: values.phone || undefined,
      };

      const result = await trigger(payload);

      globalMutate(
        "staff-members",
        (current: StaffListResponse | undefined) => {
          if (!current) return current;

          const updatedUser = result.response as StaffMemberDto;
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
      ).finally();

  showSuccess(t("Staff member created successfully!"));
      callback?.();
      reset();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create staff member";
  setError(t(message));
  showError({ message: t(message) });
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