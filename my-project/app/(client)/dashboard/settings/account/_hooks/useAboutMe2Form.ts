"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError, showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import { useBasicInfo } from "@/app/shared-hooks/useBasicInfo";
import { patchPhysicalAppearance } from "@/app/shared-api/physicalAppearanceApi";
import { useTranslation } from "react-i18next";

export type AboutMe2Form = {
    height: string;
    weight: string;
    eyeColor: string;
    hairColor: string;
    bodyType: string;
    appearance: string;
    clothing: string;
    intelligence: string;
};

export default function useAboutMe2Form() {
    const { t } = useTranslation();

    const { data: session } = useSession();
    const userId = session?.user?.id ? String(session.user.id) : undefined;

    const { user, userLoading } = useBasicInfo(userId);

    const aboutMe2Schema = z.object({
        height: z.string().min(1, t("Height is required")),
        weight: z.string().min(1, t("Weight is required")),
        eyeColor: z.string().min(1, t("Eye color is required")),
        hairColor: z.string().min(1, t("Hair color is required")),
        bodyType: z.string().min(1, t("Body type is required")),
        appearance: z.string().min(1, t("Appearance is required")),
        clothing: z.string().min(1, t("Clothing style is required")),
        intelligence: z.string().min(1, t("Intelligence is required")),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
    } = useForm<AboutMe2Form>({
        resolver: zodResolver(aboutMe2Schema),
        defaultValues: {
            height: "",
            weight: "",
            eyeColor: "",
            hairColor: "",
            bodyType: "",
            appearance: "",
            clothing: "",
            intelligence: "",
        },
        mode: "onBlur",
    });

    useEffect(() => {
        if (!user?.physicalAppearance) return;

        const { height, weight, clothing, appearance, bodyType, hairColor, eyeColor, intelligence } =
            user.physicalAppearance;

        reset({
            height: height || "",
            weight: weight || "",
            eyeColor: eyeColor || "",
            hairColor: hairColor || "",
            bodyType: bodyType || "",
            appearance: appearance || "",
            clothing: clothing || "",
            intelligence: intelligence || "",
        });
    }, [user, reset]);

    const { trigger, isMutating } = useSWRMutation(
        "updateAboutMe2",
        async (_, { arg }: { arg: AboutMe2Form }) => {
            if (!userId) throw new Error(t("User ID is undefined. Please log in again"));
            return await patchPhysicalAppearance(userId, arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message || t("Failed to update") });
                console.error(t("Update About Me 2 error:"), error);
            },
            onSuccess: () => {
                showSuccess(t("About Me updated successfully!"));
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (values: AboutMe2Form, callback?: () => void) => {
        try {
            const result = await trigger(values);
            if (result) {
                showSuccess(t("About Me updated successfully!"));
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
