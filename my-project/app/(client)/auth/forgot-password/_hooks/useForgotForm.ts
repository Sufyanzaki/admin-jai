import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {showError, showSuccess} from "@/shared-lib";
import useSWRMutation from 'swr/mutation';
import i18next from "i18next";
import {postForgetPassword} from "@/app/shared-api/auth";

const { t } = i18next;

const forgotSchema = z.object({
    email: z.string()
        .min(1, t("Email is required"))
        .email(t("Please enter a valid email address")),
});

export type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function useForgotForm() {

    const { trigger } = useSWRMutation(
        'forgot-password',
        async (_: string, { arg }: { arg: { email: string } }) => {
            await postForgetPassword(arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message });
            },
            onSuccess(){
                showSuccess("Email Sent! Please check your inbox for further instructions.")
            }
        }
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotFormValues>({
        resolver: zodResolver(forgotSchema),
        defaultValues: {
            email: '',
        },
        mode: 'onBlur'
    });

    const onSubmit = async (values: ForgotFormValues) => {
        try {
            await trigger({ email: values.email });
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