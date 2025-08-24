"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';
import { showError } from '@/shared-lib';
import { showSuccess } from '@/shared-lib';
import { patchPush } from '../_api/push';
import usePush from './usePush';


export default function usePushForm() {

  const { t } = useTranslation();

  const pushSchema = z.object({
    isActive: z.boolean(),
    fcmApiKey: z.string().min(1, { message: t('FCM API Key is required') }),
    authDomain: z.string().min(1, { message: t('Auth Domain is required') }),
    projectId: z.string().min(1, { message: t('Project ID is required') }),
    storageBucket: z.string().min(1, { message: t('Storage Bucket is required') }),
    messagingSenderId: z.string().min(1, { message: t('Messaging Sender ID is required') }),
    appId: z.string().min(1, { message: t('App ID is required') }),
    serverKey: z.string().min(1, { message: t('Server Key is required') }),
  });

  type PushFormValues = z.infer<typeof pushSchema>;

  const { data: existingData, isLoading: isLoadingData } = usePush();

  const { trigger, isMutating } = useSWRMutation(
    'patchPush',
    async (_: string, { arg }: { arg: PushFormValues }) => {
      return await patchPush(arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message ? t(error.message) : t('Failed to update push notification settings.') });
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
  showSuccess(t('Push notification settings updated successfully!'));
      }
    } catch (error: unknown) {
  if (error instanceof Error) showError({ message: error.message ? t(error.message) : t('Failed to update push notification settings.') });
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