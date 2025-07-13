import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {showError} from "@/admin-utils/lib/formErrors";
import {showSuccess} from "@/admin-utils/lib/formSuccess";
import {updatePassword} from "@/app/(dashboard)/profile/_api/updatePassword";
import useSWRMutation from "swr/mutation";

const passwordSchema = z.object({
    currentPassword: z.string()
        .min(1, "Current password is required")
        .min(6, "Password must be at least 6 characters"),
    newPassword: z.string()
        .min(1, "New password is required")
        .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
        .min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
}).refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
});

export type PasswordFormValues = z.infer<typeof passwordSchema>;

type UpdatePasswordProps = {
    currentPassword: string;
    newPassword: string;
}

export default function usePasswordForm() {
    const { trigger, isMutating } = useSWRMutation(
        'updatePassword',
        async (url: string, { arg }: { arg: UpdatePasswordProps }) => {
            return await updatePassword(arg);
        },
        {
            onError: (error: any) => {
                showError({message: error.message});
                console.error('Password update error:', error);
            }
        }
    );

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        reset,
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        mode: 'onBlur'
    });

    const onSubmit = async (values: PasswordFormValues, callback?: (data: {status: number} | undefined) => void) => {
        console.log('Password form submitted', values);

        const result = await trigger({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
        });

        if (result?.status === 200) {
            showSuccess('Password updated successfully!');
            reset();
            callback?.(result);
        }
    };

    return {
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        register,
    };
}
