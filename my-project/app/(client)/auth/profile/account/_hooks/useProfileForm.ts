"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import useSWRMutation from "swr/mutation";
import { showError, showSuccess } from "@/shared-lib";
import { patchUser } from "@/app/shared-api/userApi";
import {useRouter} from "next/navigation";
import {updateUserTrackingId} from "@/lib/access-token";

const profileFormSchema = z
    .object({
        email: z.string().email("Please enter a valid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function useProfileForm() {
    const router = useRouter();
    const { data: session } = useSession();
    const userId = session?.user?.id ? String(session.user.id) : undefined;

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        reset,
        watch,
        trigger,
        register
    } = useForm<ProfileFormValues>({
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
        async (_, { arg }: { arg: ProfileFormValues }) => {
            if (!userId) throw new Error("User not authenticated");

            const payload = {
                email: arg.email,
                password: arg.password,
            };

            return await patchUser(userId, payload);
        },
        {
            onError: (err: Error) => {
                showError({ message: err.message || "Failed to update profile" });
            },
            onSuccess: () => {
                showSuccess("Profile updated successfully!");
            },
            revalidate: false,
        }
    );

    const onSubmit = async (values: ProfileFormValues) => {
        const isValid = await trigger();
        if (!isValid) return;
        updateUserTrackingId({ step7: true })
        await mutate(values);
        router.push("/auth/profile/membership");
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
