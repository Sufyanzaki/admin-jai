"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError, showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import { useBasicInfo } from "@/app/shared-hooks/useBasicInfo";
import { patchLifeStyle, postLifeStyle } from "@/app/shared-api/lifeStyleApi";
import { useTranslation } from "react-i18next";


export default function useLifeStyleForm() {
    const { t } = useTranslation();
    const { data: session } = useSession();
    const userId = session?.user?.id ? String(session.user.id) : undefined;

    const lifestyleSchema = z.object({
        smoke: z.string().min(1, t("Smoking preference is required")),
        drinking: z.string().min(1, t("Drinking preference is required")),
        goingOut: z.string().min(1, t("Going out preference is required")),
    });

    type LifestyleForm = z.infer<typeof lifestyleSchema>;

    const { user, userLoading } = useBasicInfo(userId);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
    } = useForm<LifestyleForm>({
        resolver: zodResolver(lifestyleSchema),
        defaultValues: {
            smoke: "",
            drinking: "",
            goingOut: "",
        },
        mode: "onBlur",
    });

    useEffect(() => {
        if (!user) return;

        reset({
            smoke: user.lifestyle?.smoke || "",
            drinking: user.lifestyle?.drinking || "",
            goingOut: user.lifestyle?.goingOut || "",
        });
    }, [user, reset]);

    const { trigger, isMutating } = useSWRMutation(
        "updateLifestyle",
        async (_, { arg }: { arg: LifestyleForm }) => {
            if (!userId) throw new Error("User ID is undefined. Please log in again");
            if (user?.lifestyle) await patchLifeStyle(userId, arg);
            else await postLifeStyle(userId, arg);
            return true;
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message || "Failed to update lifestyle" });
                console.error("Update Lifestyle error:", error);
            },
            onSuccess: () => {
                showSuccess(t("Lifestyle information updated successfully!"));
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (values: LifestyleForm, callback?: () => void) => {
        try {
            const result = await trigger(values);
            if (result) {
                showSuccess(t("Lifestyle information updated successfully!"));
                callback?.();
            }
        } catch (error: unknown) {
            // @ts-expect-error unknown type
            showError({ message: t(error.message) });
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        control,
        errors,
        isLoading: isSubmitting || isMutating,
        isFetching: userLoading,
    };
}