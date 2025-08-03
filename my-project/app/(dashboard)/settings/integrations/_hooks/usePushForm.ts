"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { showError } from '@/admin-utils/lib/formErrors';
import { showSuccess } from '@/admin-utils/lib/formSuccess';
import { patchPush } from '../_api/push';
import usePush from './usePush';

const pushSchema = z.object({
  isActive: z.boolean(),
  fcmApiKey: z.string().min(1, { message: 'FCM API Key is required' }),
  authDomain: z.string().min(1, { message: 'Auth Domain is required' }),
  projectId: z.string().min(1, { message: 'Project ID is required' }),
  storageBucket: z.string().min(1, { message: 'Storage Bucket is required' }),
  messagingSenderId: z.string().min(1, { message: 'Messaging Sender ID is required' }),
  appId: z.string().min(1, { message: 'App ID is required' }),
  serverKey: z.string().min(1, { message: 'Server Key is required' }),
});

export type PushFormValues = z.infer<typeof pushSchema>;

export default function usePushForm() {
  const { data: existingData, isLoading: isLoadingData } = usePush();

  const { trigger, isMutating } = useSWRMutation(
    'patchPush',
    async (_: string, { arg }: { arg: PushFormValues }) => {
      return await patchPush(arg);
    },
    {
      onError: (error: any) => {
        showError({ message: error.message });
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    control,
  } = useForm<PushFormValues>({
    resolver: zodResolver(pushSchema),
    defaultValues: {
      isActive: false,
      fcmApiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      serverKey: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (existingData) {
      reset({
        isActive: existingData.isActive,
        fcmApiKey: existingData.fcmApiKey,
        authDomain: existingData.authDomain,
        projectId: existingData.projectId,
        storageBucket: existingData.storageBucket,
        messagingSenderId: existingData.messagingSenderId,
        appId: existingData.appId,
        serverKey: existingData.serverKey,
      });
    }
  }, [existingData, reset]);

  const onSubmit = async (values: PushFormValues) => {
    try {
      const result = await trigger(values);
      if (result) {
        showSuccess('Push notification settings updated successfully!');
      }
    } catch (error: any) {
      showError({ message: error.message || 'Failed to update push notification settings.' });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    isLoadingData,
    setValue,
    watch,
    control,
    existingData,
    reset,
  };
} 