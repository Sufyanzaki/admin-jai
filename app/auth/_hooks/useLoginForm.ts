import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {showError} from "@/admin-utils/lib/formErrors";

const loginSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    password: z.string()
        .min(6, "Password must be at least 6 characters"),
    rememberMe: z.boolean().optional().default(true),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function useLoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: true,
        },
        mode: 'onBlur'
    });

    const onSubmit = async (values: LoginFormValues, callback?: () => void) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
                callbackUrl: '/',
            });

            if (result?.error) {
                const errorMessage = result.error === 'CredentialsSignin'
                    ? 'Invalid email or password'
                    : 'Login failed. Please try again.';

                showError({message: errorMessage});
                setError('root', { message: errorMessage });
            } else {
                callback?.();
                router.push('/');
            }
        } catch (error) {
            showError({message: 'An unexpected error occurred. Please try again.'});
            console.error('Login error:', error);
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