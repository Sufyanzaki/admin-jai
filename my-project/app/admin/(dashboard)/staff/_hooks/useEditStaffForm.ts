"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { editStaffMember, getStaffMember } from "../_api/staffApi";
import { showError, showSuccess } from "@/shared-lib";
import { imageUpload } from "@/admin-utils/utils/imageUpload";
import { useTranslation } from "react-i18next";
import useSWRMutation from "swr/mutation";
import useSWR, { useSWRConfig } from "swr";
import { useEffect } from "react";
import { StaffListResponse, StaffMemberDto } from "../_types/staff";
import { useParams } from "next/navigation";


export function useEditStaffForm() {
  const { t } = useTranslation();

  const editStaffSchema = z.object({
    email: z.string().min(1, t("Email is required")).email(t("Please enter a valid email address")),
    firstName: z.string().min(1, t("First name is required")),
    lastName: z.string().min(1, t("Last name is required")),
    roleId: z.string().min(1, t("Role is required")),
    image: z.any().optional(),
    phone: z.string().optional(),
  });

  type EditStaffFormValues = z.infer<typeof editStaffSchema>;

  const params = useParams();
  const id = params.id as string;
  const { mutate: globalMutate } = useSWRConfig();

  // Fetch staff member data
  const { data: staffMember, isLoading: staffLoading } = useSWR(
    id ? `staff-member-${id}` : null,
    () => getStaffMember(id)
  );

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
    control,
  } = useForm<EditStaffFormValues>({
    resolver: zodResolver(editStaffSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      roleId: "",
      image: undefined,
      phone: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!staffMember) return;

    reset({
      email: staffMember.email,
      firstName: staffMember.firstName,
      lastName: staffMember.lastName,
      roleId: String(staffMember.roleId),
      phone: staffMember.phone || "",
    });
  }, [staffMember, reset]);

  const { trigger, isMutating } = useSWRMutation(
    "editStaffMember",
    async (_: string, { arg }: { arg: Partial<StaffMemberDto> }) => {
      return await editStaffMember(arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: error?.message ? t(error.message) : t("Failed to update staff member") });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: EditStaffFormValues) => {
    try {
      let imageUrl = values.image;
      if (values.image instanceof File) {
        imageUrl = await imageUpload(values.image);
      }

      const payload = {
        id,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        roleId: values.roleId,
        ...(values.phone && { phone: values.phone }),
        ...(imageUrl && { image: imageUrl }),
      };

      const result = await trigger(payload);

      globalMutate(
        "staff-members",
        (current: StaffListResponse | undefined) => {
          if (!current) return current;
          return {
            ...current,
            staffMembers: current.staffMembers.map(member =>
              member.id === id ? result as StaffMemberDto : member
            ),
          };
        },
        false
      ).finally();

      globalMutate(`staff-member-${id}`, result, false).finally();
      showSuccess(t("Staff member updated successfully!"));
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    staffLoading,
    setValue,
    control,
    onSubmit,
    staffMember,
  };
}