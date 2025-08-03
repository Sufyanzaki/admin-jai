import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { showError } from '@/admin-utils/lib/formErrors';
import { showSuccess } from '@/admin-utils/lib/formSuccess';
import { patchMollie } from '../_api/mollie';
import useMollie from './useMollie';

const mollieSchema = z.object({
  key: z.string().min(1, { message: 'Key is required' }),
  isActive: z.boolean(),
});

export type MollieFormValues = z.infer<typeof mollieSchema>;

export default function useMollieForm() {
  const { data: existingData, isLoading: isLoadingData } = useMollie();

  const { trigger, isMutating } = useSWRMutation(
    'patchMollie',
    async (_: string, { arg }: { arg: MollieFormValues }) => {
      return await patchMollie(arg);
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
  } = useForm<MollieFormValues>({
    resolver: zodResolver(mollieSchema),
    defaultValues: {
      key: '',
      isActive: false,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (existingData) {
      reset({
        key: existingData.key ?? '',
        isActive: existingData.isActive,
      });
    }
  }, [existingData, reset]);

  const onSubmit = async (values: MollieFormValues) => {
    try {
      const result = await trigger(values);
      if (result) {
        showSuccess('Mollie settings updated successfully!');
      }
    } catch (error: any) {
      showError({ message: error.message || 'Failed to update Mollie settings.' });
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