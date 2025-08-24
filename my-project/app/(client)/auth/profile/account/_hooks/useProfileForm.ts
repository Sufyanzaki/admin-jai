import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import useSWRMutation from "swr/mutation";
import { showError, showSuccess } from "@/shared-lib";
import { patchUser } from "@/app/shared-api/userApi";
import { useRouter } from "next/navigation";
import { updateUserTrackingId } from "@/lib/access-token";
import { useTranslation } from "react-i18next";

export default function useProfileForm() {
    const { t } = useTranslation();
    const router = useRouter();
    const { data: session } = useSession();
    const userId = session?.user?.id ? String(session.user.id) : undefined;

    const profileFormSchema = z
        .object({
            email: z.string().email(t("Please enter a valid email")),
            password: z.string().min(6, t("Password must be at least 6 characters")),
            confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ["confirmPassword"],
            message: t("Passwords do not match"),
        });

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
        setValue,
        reset,
        watch,
        trigger,
        register
    } = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onBlur",
    });

    const { trigger: mutate, isMutating } = useSWRMutation(
        "updateUserProfile",
        async (_, { arg }: { arg: z.infer<typeof profileFormSchema> }) => {
            if (!userId) throw new Error(t("User not authenticated"));

            const payload = {
                email: arg.email,
                password: arg.password,
            };

            return await patchUser(userId, payload);
        },
        {
            onError: (err: Error) => {
                showError({ message: err.message || t("Failed to update profile") });
            },
            onSuccess: () => {
                showSuccess(t("Profile updated successfully!"));
            },
            revalidate: false,
        }
    );

    const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
        if (!isDirty) {
            router.push("/membership");
            return;
        }

        const isValid = await trigger();
        if (!isValid) return;
        updateUserTrackingId({ step7: true });
        await mutate(values);
        router.push("/membership");
    };

    return {
        control,
        handleSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        setValue,
        watch,
        register,
        reset,
        onSubmit,
        trigger,
    };
}
