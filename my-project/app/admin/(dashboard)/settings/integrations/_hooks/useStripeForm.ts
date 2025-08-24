import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { showError } from '@/shared-lib';
import { showSuccess } from '@/shared-lib';
import { patchStripe } from '../_api/stripe';
import useStripe from './useStripe';

export default function useStripeForm() {


  const { t } = useTranslation();

  const stripeSchema = z.object({
    key: z.string().min(1, { message: t('Key is required') }),
    publicKey: z.string().min(1, { message: t('Public Key is required') }),
    isActive: z.boolean(),
  });

  type StripeFormValues = z.infer<typeof stripeSchema>;

  const { data: existingData, isLoading: isLoadingData } = useStripe();

  const { trigger, isMutating } = useSWRMutation(
    'patchStripe',
    async (_: string, { arg }: { arg: StripeFormValues }) => {
      return await patchStripe(arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message ? t(error.message) : t('Failed to update Stripe settings.') });
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
  } = useForm<StripeFormValues>({
    resolver: zodResolver(stripeSchema),
    defaultValues: {
      key: '',
      publicKey: '',
      isActive: false,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (existingData) {
      reset({
        key: existingData.key,
        publicKey: existingData.publicKey,
        isActive: existingData.isActive,
      });
    }
  }, [existingData, reset]);

  const onSubmit = async (values: StripeFormValues) => {
    try {
      const result = await trigger(values);
      if (result) {
  showSuccess(t('Stripe settings updated successfully!'));
      }
    } catch (error: unknown) {
  if (error instanceof Error) showError({ message: error.message ? t(error.message) : t('Failed to update Stripe settings.') });
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