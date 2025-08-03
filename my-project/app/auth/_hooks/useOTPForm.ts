"use client"

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useRouter, useSearchParams} from 'next/navigation';
import {showError} from '@/admin-utils/lib/formErrors';
import {signIn} from 'next-auth/react';

const otpSchema = z.object({
  otp: z.string()
    .length(5, 'OTP must be exactly 5 digits')
    .regex(/^\d{5}$/, 'OTP must contain only digits'),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

export default function useOTPForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const router = useRouter();

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
    const result = await signIn('credentials', {
        redirect: false,
        ...values,
        email,
        callbackUrl: '/dashboard',
    });

    if (result?.error) {
        const errorMessage = result.error === 'CredentialsSignin'
            ? 'Invalid OTP '
            : 'Login failed. Please try again.';

        showError({message: errorMessage});
    }
    else router.push('/dashboard');
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