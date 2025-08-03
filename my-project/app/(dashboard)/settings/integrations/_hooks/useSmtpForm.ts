import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { showError } from '@/admin-utils/lib/formErrors';
import { showSuccess } from '@/admin-utils/lib/formSuccess';
import { patchSmtp } from '../_api/smtp';
import useSmtp from './useSmtp';

const smtpSchema = z.object({
  host: z.string().min(1, { message: 'Host is required' }),
  port: z.number().min(1, { message: 'Port is required' }).max(65535, { message: 'Port must be between 1 and 65535' }),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  encryption: z.string().min(1, { message: 'Encryption is required' }),
  fromAddress: z.string().email({ message: 'From Address must be a valid email' }),
  fromName: z.string().min(1, { message: 'From Name is required' }),
});

export type SmtpFormValues = z.infer<typeof smtpSchema>;

export default function useSmtpForm() {
  const { data: existingData, isLoading: isLoadingData } = useSmtp();

  const { trigger, isMutating } = useSWRMutation(
    'patchSmtp',
    async (_: string, { arg }: { arg: SmtpFormValues }) => {
      return await patchSmtp(arg);
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
        showSuccess('SMTP settings updated successfully!');
      }
    } catch (error: any) {
      showError({ message: error.message || 'Failed to update SMTP settings.' });
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