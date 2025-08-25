import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useRouter} from 'next/navigation';
import {showError, showSuccess} from "@/shared-lib";
import useSWRMutation from 'swr/mutation';
import i18next from "i18next";
import {postResetPassword} from "@/app/shared-api/auth";

const { t } = i18next;

const resetSchema = z.object({
    password: z.string()
        .min(6, t("Password must be at least 6 characters")),
    confirmPassword: z.string()
        .min(6, t("Password must be at least 6 characters")),
}).refine((data) => data.password === data.confirmPassword, {
    message: t("Passwords do not match"),
    path: ["confirmPassword"],
});

export type ResetFormValues = z.infer<typeof resetSchema>;

export default function useResetForm() {
    const searchParams = new URLSearchParams(window.location.search);
    const router = useRouter();

    const { trigger } = useSWRMutation(
        'reset-password',
        async (
            _: string,
            { arg }: { arg: { password: string } }
        ) => {
            const token = searchParams.get('token') || '';
            return await postResetPassword( arg, token);
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
    } = useForm<ResetFormValues>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        mode: 'onBlur'
    });

    const onSubmit = async (values: ResetFormValues) => {
        try {
            await trigger(values);
            showSuccess("Password has been reset successfully. Please login with your new password.");
            router.push('/auth/login');
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