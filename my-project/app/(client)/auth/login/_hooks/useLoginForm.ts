import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { showError } from "@/shared-lib";
import useSWRMutation from 'swr/mutation';
import { postLoginForm } from '@/app/shared-api/auth';
import { setUserEmail } from "@/lib/access-token";
import i18next from "i18next";

const { t } = i18next;

const loginSchema = z.object({
    email: z.string()
        .min(1, t("Email is required"))
        .email(t("Please enter a valid email address")),
    password: z.string()
        .min(6, t("Password must be at least 6 characters")),
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
            onError: (error: Error) => {
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
            router.push('/auth/otp');
        } catch (error: unknown) {
            // @ts-expect-error unknown type
            showError({message: error.message || t("An unexpected error occurred. Please try again.")});
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
    };
}
