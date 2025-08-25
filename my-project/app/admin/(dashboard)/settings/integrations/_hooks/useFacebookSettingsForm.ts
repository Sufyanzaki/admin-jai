"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';
import { showError } from '@/shared-lib';
import { showSuccess } from '@/shared-lib';
import { patchFacebookSettings, PatchFacebookSettingsProps } from '../_api/patchFacebookSettings';
import useFacebookSettings from './useFacebookSettings';


export default function useFacebookSettingsForm() {

  const { t } = useTranslation();

  const facebookSettingsSchema = z.object({
    clientId: z.string().min(1, { message: t('Client ID is required') }),
    clientSecret: z.string().min(1, { message: t('Client SECRET is required') }),
    isActive: z.boolean(),
  });

  type FacebookSettingsFormValues = z.infer<typeof facebookSettingsSchema>;

  const { data: existingData, isLoading: isLoadingData } = useFacebookSettings();

  const { trigger, isMutating } = useSWRMutation(
    'patchFacebookSettings',
    async (_: string, { arg }: { arg: PatchFacebookSettingsProps }) => {
      return await patchFacebookSettings(arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message ? t(error.message) : t('Failed to update Facebook settings.') });
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
  showSuccess(t('Facebook settings updated successfully!'));
      }
    } catch (error: unknown) {
      // @ts-expect-error unknown type
      showError({ message: t(error.message) });
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