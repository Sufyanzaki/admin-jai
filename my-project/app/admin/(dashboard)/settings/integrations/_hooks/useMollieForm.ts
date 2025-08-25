import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';
import { showError } from '@/shared-lib';
import { showSuccess } from '@/shared-lib';
import { patchMollie } from '../_api/mollie';
import useMollie from './useMollie';


export default function useMollieForm() {

  const { t } = useTranslation();

  const mollieSchema = z.object({
    key: z.string().min(1, { message: t('Key is required') }),
    isActive: z.boolean(),
  });

  type MollieFormValues = z.infer<typeof mollieSchema>;

  const { data: existingData, isLoading: isLoadingData } = useMollie();

  const { trigger, isMutating } = useSWRMutation(
    'patchMollie',
    async (_: string, { arg }: { arg: MollieFormValues }) => {
      return await patchMollie(arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message ? t(error.message) : t('Failed to update Mollie settings.') });
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
  showSuccess(t('Mollie settings updated successfully!'));
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