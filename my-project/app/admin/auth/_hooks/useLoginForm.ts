import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { showError } from "@/shared-lib";
import useSWRMutation from 'swr/mutation';
import { postLoginForm } from '../_api/postLoginForm';
import { setUserEmail } from "@/lib/access-token";

const loginSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    password: z.string()
        .min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function useLoginForm() {

    const router = useRouter();

    const { trigger } = useSWRMutation(
        'login',
        async (_: string, { arg }: { arg: { email: string; password: string } }) => {
            return await postLoginForm(arg);
        },
        {
            onError: (error: unknown) => {
                if (error instanceof Error) {
                    showError({ message: error.message });
                } else {
                    showError({ message: 'An unknown error occurred.' });
                }
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
            const message =
                typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string'
                    ? (error as { message: string }).message
                    : 'An unexpected error occurred. Please try again.';
            showError({ message });
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