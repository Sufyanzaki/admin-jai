import { showError, showSuccess } from '@/shared-lib';
import { postLike, sendLike } from './../_api/postLike';
import { useState } from "react";
import { blockUser } from '../_api/postBlockUser';
import { mutate } from 'swr';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const reportUserchema = z.object({
  reason: z.string().min(1, "please enter reason"),
  additionDetail: z.string().optional(),
});

export type ComplaintFormValues = z.infer<typeof reportUserchema>;

export const useReportProfile = (blockedUserId: number) => {

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
  } = useForm<ComplaintFormValues>({
    resolver: zodResolver(reportUserchema),
    defaultValues: {
      reason: "",
      additionDetail: "",
    },
  });

  const trigger = async (blockedUserId: number) => {

    try {
      const res = await blockUser({ blockedUserId });
      if (res) {
        showSuccess("User Blocked successfully!");
      }
      mutate("blocked-profiles");
      return res;
    } catch (err: any) {
      let message = "An error occurred while blocking this profile";

      if (err instanceof Error) {
        message = err.message;
      } else if (err?.response?.data?.message) {
        message = err.response.data.message; // axios-style
      } else if (err?.message) {
        message = err.message; // fetch or plain object
      }

      showError({ message });
      throw err;
    }
  };

  const onSubmit = async (values: ComplaintFormValues, callback?: () => void) => {
    const result = await trigger(blockedUserId);
  };


  return {
    handleSubmit,
    onSubmit,
    errors,
    register,
    setValue,
    control,
    watch,
    reset,
    isSubmitting
  };
};
