"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { showError } from '@/shared-lib';
import { signIn } from 'next-auth/react';
import { getUserEmail } from "@/lib/access-token";
import { useTranslation } from 'react-i18next';

export default function useOTPForm() {
  const { t } = useTranslation();
  const email = getUserEmail();
  const router = useRouter();

  const otpSchema = z.object({
    otp: z.string()
      .length(5, t('OTP must be exactly 5 digits'))
      .regex(/^\d{5}$/, t('OTP must contain only digits')),
  });

  type OtpFormValues = z.infer<typeof otpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (values: OtpFormValues) => {
    const result = await signIn('admin-otp', {
      redirect: false,
      ...values,
      email,
      callbackUrl: '/admin/dashboard',
    });

    if (result?.error) {
      const errorMessage = result.error === 'CredentialsSignin'
        ? t('Invalid OTP')
        : t('Login failed. Please try again.');

      showError({ message: errorMessage });
    }
    else router.push('/admin/dashboard');
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading: isSubmitting,
    control,
    setValue,
  };
} 