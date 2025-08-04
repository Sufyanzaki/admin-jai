"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { showError } from '@/admin-utils/lib/formErrors';
import { showSuccess } from '@/admin-utils/lib/formSuccess';
import { patchGoogleSettings, PatchGoogleSettingsProps } from '../_api/patchGoogleSettings';
import useGoogleSettings from './useGoogleSettings';

const googleSettingsSchema = z.object({
  clientId: z.string().min(1, { message: 'Client ID is required' }),
  clientSecret: z.string().min(1, { message: 'Client SECRET is required' }),
  isActive: z.boolean(),
});

export type GoogleSettingsFormValues = z.infer<typeof googleSettingsSchema>;

export default function useGoogleSettingsForm() {
  const { data: existingData, isLoading: isLoadingData } = useGoogleSettings();

  const { trigger, isMutating } = useSWRMutation(
    'patchGoogleSettings',
    async (_: string, { arg }: { arg: PatchGoogleSettingsProps }) => {
      return await patchGoogleSettings(arg);
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
  } = useForm<GoogleSettingsFormValues>({
    resolver: zodResolver(googleSettingsSchema),
    defaultValues: {
      clientId: null,
      clientSecret: null,
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

  const onSubmit = async (values: GoogleSettingsFormValues) => {
    const result = await trigger({
        clientId: values.clientId,
        clientSecret: values.clientSecret,
        isActive: values.isActive,
      });
      
      if (result) {
        showSuccess('Google settings updated successfully!');
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