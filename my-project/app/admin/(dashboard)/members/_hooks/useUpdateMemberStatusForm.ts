'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { useBasicInfo } from './useBasicInfo';
import { patchUserStatus } from '../add/_api/createUser';
import { useEffect } from 'react';

const memberStatusSchema = z.object({
  isActive: z.boolean(),
});

export type MemberStatusFormValues = z.infer<typeof memberStatusSchema>;

export default function useUpdateMemberStatusForm() {
  // 1. useBasicInfo fetches user data
  const { user, mutate } = useBasicInfo();
  
  const typedUser = user as any;

  const { trigger, isMutating } = useSWRMutation(
    'updateMemberStatus',
    async (url: string, { arg }: { arg: { userId: string; isActive: boolean } }) => {
      return await patchUserStatus(arg.userId, arg.isActive);
    },
    {
      onError: (error: any) => {
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

  // 3. useEffect ensures form stays in sync
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

      if (result?.status === 200) {
        await mutate();
        showSuccess('Member status updated successfully!');
      }
    } catch (error: any) {
      showError({ message: error.message });
      console.error('Member status update error:', error);
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