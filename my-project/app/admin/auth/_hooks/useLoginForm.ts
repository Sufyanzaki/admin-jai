"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { showError } from "@/shared-lib";
import useSWRMutation from 'swr/mutation';
import { postLoginForm } from '@/app/shared-api/auth';
import { setUserEmail } from "@/lib/access-token";
import { useTranslation } from 'react-i18next';

export default function useLoginForm() {
    const { t } = useTranslation();

    const router = useRouter();

    const loginSchema = z.object({
        email: z.string()
            .min(1, t("Email is required"))
            .email(t("Please enter a valid email address")),
        password: z.string()
            .min(6, t("Password must be at least 6 characters")),
    });

    type LoginFormValues = z.infer<typeof loginSchema>;


    const { trigger } = useSWRMutation(
        'login',
        async (_: string, { arg }: { arg: { email: string; password: string } }) => {
            return await postLoginForm(arg);
        },
        {
            onError: (error: unknown) => {
                // @ts-expect-error unknown type
                showError({ message: t(error.message) }); setError(error.message); throw new Error(error.message);
            }
        }
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur'
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            await trigger({
                email: values.email,
                password: values.password,
            });
            setUserEmail(values.email);
            router.push('/admin/auth/otp');
        } catch (error: unknown) {
            // @ts-expect-error unknown type
            showError({ message: t(error.message) }); setError(error.message); throw new Error(error.message);
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting,
    };
}