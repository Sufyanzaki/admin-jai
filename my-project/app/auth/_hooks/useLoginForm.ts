import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useRouter} from 'next/navigation';
import {showError} from "@/admin-utils/lib/formErrors";
import useSWRMutation from 'swr/mutation';
import { postLoginForm } from '../_api/postLoginForm';

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

    const { trigger } = useSWRMutation(
        'login',
        async (_: string, { arg }: { arg: { email: string; password: string } }) => {
            return await postLoginForm(arg);
        },
        {
            onError: (error: any) => {
                showError({ message: error.message });
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
            rememberMe: true,
        },
        mode: 'onBlur'
    });

    const onSubmit = async (values: LoginFormValues, callback?: (data: any) => void) => {
        try {
            await trigger({
                email: values.email,
                password: values.password,
            });
            router.push('/auth/otp?email=' + values.email);
        } catch (error: any) {
            showError({ message: error.message || 'An unexpected error occurred. Please try again.' });
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