import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { showError } from '@/admin-utils/lib/formErrors';
import { showSuccess } from '@/admin-utils/lib/formSuccess';
import { patchStripe } from '../_api/stripe';
import useStripe from './useStripe';

const stripeSchema = z.object({
  key: z.string().min(1, { message: 'Key is required' }),
  publicKey: z.string().min(1, { message: 'Public Key is required' }),
  isActive: z.boolean(),
});

export type StripeFormValues = z.infer<typeof stripeSchema>;

export default function useStripeForm() {
  const { data: existingData, isLoading: isLoadingData } = useStripe();

  const { trigger, isMutating } = useSWRMutation(
    'patchStripe',
    async (_: string, { arg }: { arg: StripeFormValues }) => {
      return await patchStripe(arg);
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
        showSuccess('Stripe settings updated successfully!');
      }
    } catch (error: any) {
      showError({ message: error.message || 'Failed to update Stripe settings.' });
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