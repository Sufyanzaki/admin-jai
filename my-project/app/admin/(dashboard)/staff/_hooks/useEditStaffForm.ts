"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {editStaffMember, getStaffMember} from "../_api/staffApi";
import {showError, showSuccess} from "@/shared-lib";
import {imageUpload} from "@/admin-utils/utils/imageUpload";
import useSWRMutation from "swr/mutation";
import useSWR, {useSWRConfig} from "swr";
import {useEffect} from "react";
import {StaffListResponse, StaffMemberDto} from "../_types/staff";
import {useParams} from "next/navigation";

const editStaffSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  roleId: z.string().min(1, "Role is required"),
  image: z.any().optional(),
  phone: z.string().optional(),
});

export type EditStaffFormValues = z.infer<typeof editStaffSchema>;

export function useEditStaffForm() {
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
          showError({ message: error?.message || "Failed to update staff member" });
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
      showSuccess("Staff member updated successfully!");
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