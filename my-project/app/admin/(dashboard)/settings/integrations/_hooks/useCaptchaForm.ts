import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { showError } from '@/admin-utils/lib/formErrors';
import { showSuccess } from '@/admin-utils/lib/formSuccess';
import { patchCaptcha } from '../_api/captcha';
import useCaptcha from './useCaptcha';

const captchaSchema = z.object({
  siteKey: z.string().min(1, { message: 'Site Key is required' }),
  siteSecret: z.string().min(1, { message: 'Site Secret is required' }),
  isActive: z.boolean(),
});

export type CaptchaFormValues = z.infer<typeof captchaSchema>;

export default function useCaptchaForm() {
  const { data: existingData, isLoading: isLoadingData } = useCaptcha();

  const { trigger, isMutating } = useSWRMutation(
    'patchCaptcha',
    async (_: string, { arg }: { arg: CaptchaFormValues }) => {
      return await patchCaptcha(arg);
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
  } = useForm<CaptchaFormValues>({
    resolver: zodResolver(captchaSchema),
    defaultValues: {
      siteKey: '',
      siteSecret: '',
      isActive: false,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (existingData) {
      reset({
        siteKey: existingData.siteKey,
        siteSecret: existingData.siteSecret,
        isActive: existingData.isActive || false,
      });
    }
  }, [existingData, reset]);

  const onSubmit = async (values: CaptchaFormValues) => {
    try {
      const result = await trigger(values);
      if (result) {
        showSuccess('Captcha settings updated successfully!');
      }
    } catch (error: any) {
      showError({ message: error.message || 'Failed to update captcha settings.' });
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
  };
} 