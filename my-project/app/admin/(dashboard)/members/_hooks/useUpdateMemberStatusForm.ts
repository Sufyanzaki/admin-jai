'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { useBasicInfo } from '../../../../shared-hooks/useBasicInfo';
import { patchUserStatus } from '@/app/shared-api/userApi';
import { useEffect } from 'react';
import {MemberProfile} from "@/app/shared-types/member";

const memberStatusSchema = z.object({
  isActive: z.boolean(),
});

export type MemberStatusFormValues = z.infer<typeof memberStatusSchema>;

export default function useUpdateMemberStatusForm() {
  const { user, mutate } = useBasicInfo();
  
  const typedUser = user as MemberProfile;

  const { trigger, isMutating } = useSWRMutation(
    'updateMemberStatus',
    async (url: string, { arg }: { arg: { userId: string; isActive: boolean } }) => {
      return await patchUserStatus(arg.userId, arg.isActive);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message });
        console.error('Member status update error:', error);
      }
    }
  );

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    control,
  } = useForm<MemberStatusFormValues>({
    resolver: zodResolver(memberStatusSchema),
    // 2. Form initializes with current isActive state
    defaultValues: {
      isActive: typedUser?.isActive ?? false,
    },
    mode: 'onBlur'
  });

  useEffect(() => {
    if (typedUser?.isActive !== undefined) {
      setValue('isActive', typedUser.isActive);
    }
  }, [typedUser?.isActive, setValue]);

  const onSubmit = async (values: MemberStatusFormValues) => {
    try {
      if (!typedUser?.id) {
        showError({ message: 'User ID not found' });
        return;
      }

      const userId = typedUser.id.toString();
      const result = await trigger({
        userId,
        isActive: values.isActive,
      });

      if (result) {
        await mutate();
        showSuccess('Member status updated successfully!');
      }
    } catch (error: unknown) {
      if(error instanceof Error){
        showError({ message: error.message });
        console.error('Member status update error:', error);
      }
    }
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    setValue,
    watch,
    control,
    currentStatus: typedUser?.isActive,
  };
} 