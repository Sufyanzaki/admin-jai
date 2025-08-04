"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { showError } from '@/admin-utils/lib/formErrors';
import { showSuccess } from '@/admin-utils/lib/formSuccess';
import { patchFacebookSettings, PatchFacebookSettingsProps } from '../_api/patchFacebookSettings';
import useFacebookSettings from './useFacebookSettings';

const facebookSettingsSchema = z.object({
  clientId: z.string().min(1, { message: 'Client ID is required' }),
  clientSecret: z.string().min(1, { message: 'Client SECRET is required' }),
  isActive: z.boolean(),
});

export type FacebookSettingsFormValues = z.infer<typeof facebookSettingsSchema>;

export default function useFacebookSettingsForm() {
  const { data: existingData, isLoading: isLoadingData } = useFacebookSettings();

  const { trigger, isMutating } = useSWRMutation(
    'patchFacebookSettings',
    async (_: string, { arg }: { arg: PatchFacebookSettingsProps }) => {
      return await patchFacebookSettings(arg);
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
  } = useForm<FacebookSettingsFormValues>({
    resolver: zodResolver(facebookSettingsSchema),
    defaultValues: {
      clientId: '',
      clientSecret: '',
      isActive: false,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (existingData) {
      reset({
        clientId: existingData.clientId,
        clientSecret: existingData.clientSecret,
        isActive: existingData.isActive,
      });
    }
  }, [existingData, reset]);

  const onSubmit = async (values: FacebookSettingsFormValues) => {
    try {
      const result = await trigger({
        clientId: values.clientId,
        clientSecret: values.clientSecret,
        isActive: values.isActive,
      });
      
      if (result) {
        showSuccess('Facebook settings updated successfully!');
      }
    } catch (error: any) {
      showError({ message: error.message || 'Failed to update Facebook settings.' });
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
    existingData,
    control,
  };
} 