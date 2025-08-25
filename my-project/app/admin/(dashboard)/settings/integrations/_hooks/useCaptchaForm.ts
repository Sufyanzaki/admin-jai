import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';
import { showError } from '@/shared-lib';
import { showSuccess } from '@/shared-lib';
import { patchCaptcha } from '../_api/captcha';
import useCaptcha from './useCaptcha';


export default function useCaptchaForm() {

  const { t } = useTranslation();

  const captchaSchema = z.object({
    siteKey: z.string().min(1, { message: t('Site Key is required') }),
    siteSecret: z.string().min(1, { message: t('Site Secret is required') }),
    isActive: z.boolean(),
  });

  type CaptchaFormValues = z.infer<typeof captchaSchema>;

  const { data: existingData, isLoading: isLoadingData } = useCaptcha();

  const { trigger, isMutating } = useSWRMutation(
    'patchCaptcha',
    async (_: string, { arg }: { arg: CaptchaFormValues }) => {
      return await patchCaptcha(arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message ? t(error.message) : t('Failed to update captcha settings.') });
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
  showSuccess(t('Captcha settings updated successfully!'));
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
    control,
    existingData,
  };
} 