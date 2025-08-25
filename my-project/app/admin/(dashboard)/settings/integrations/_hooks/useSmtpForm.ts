import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';
import { showError } from '@/shared-lib';
import { showSuccess } from '@/shared-lib';
import { patchSmtp } from '../_api/smtp';
import useSmtp from './useSmtp';

export default function useSmtpForm() {

  const { t } = useTranslation();

  const smtpSchema = z.object({
    host: z.string().min(1, { message: t('Host is required') }),
    port: z.number().min(1, { message: t('Port is required') }).max(65535, { message: t('Port must be between 1 and 65535') }),
    username: z.string().min(1, { message: t('Username is required') }),
    password: z.string().min(1, { message: t('Password is required') }),
    encryption: z.string().min(1, { message: t('Encryption is required') }),
    fromAddress: z.string().email({ message: t('From Address must be a valid email') }),
    fromName: z.string().min(1, { message: t('From Name is required') }),
  });

  type SmtpFormValues = z.infer<typeof smtpSchema>;


  const { data: existingData, isLoading: isLoadingData } = useSmtp();

  const { trigger, isMutating } = useSWRMutation(
    'patchSmtp',
    async (_: string, { arg }: { arg: SmtpFormValues }) => {
      return await patchSmtp(arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message ? t(error.message) : t('Failed to update SMTP settings.') });
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
  } = useForm<SmtpFormValues>({
    resolver: zodResolver(smtpSchema),
    defaultValues: {
      host: '',
      port: 587,
      username: '',
      password: '',
      encryption: 'tls',
      fromAddress: '',
      fromName: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (existingData) {
      reset({
        host: existingData.host,
        port: existingData.port,
        username: existingData.username,
        password: existingData.password,
        encryption: existingData.encryption,
        fromAddress: existingData.fromAddress,
        fromName: existingData.fromName,
      });
    }
  }, [existingData, reset]);

  const onSubmit = async (values: SmtpFormValues) => {
    try {
      const result = await trigger(values);
      if (result) {
  showSuccess(t('SMTP settings updated successfully!'));
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
    reset,
  };
} 