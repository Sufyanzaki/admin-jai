"use client";

import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {showError, showSuccess} from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import {useSession} from "next-auth/react";
import {useBasicInfo} from "@/app/shared-hooks/useBasicInfo";
import {patchPhysicalAppearance} from "@/app/shared-api/physicalAppearanceApi";

const aboutMe2Schema = z.object({
    height: z.string().min(1, "Height is required"),
    weight: z.string().min(1, "Weight is required"),
    eyeColor: z.string().min(1, "Eye color is required"),
    hairColor: z.string().min(1, "Hair color is required"),
    bodyType: z.string().min(1, "Body type is required"),
    appearance: z.string().min(1, "Appearance is required"),
    clothing: z.string().min(1, "Clothing style is required"),
    intelligence: z.string().min(1, "Intelligence is required"),
});

export type AboutMe2Form = z.infer<typeof aboutMe2Schema>;

export default function useAboutMe2Form() {
    const { data: session } = useSession();
    const userId = session?.user?.id ? String(session.user.id) : undefined;

    const { user, userLoading } = useBasicInfo(userId);

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

        const { height, weight, clothing, appearance, bodyType, hairColor, eyeColor, intelligence } = user.physicalAppearance;

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
            if (!userId)
                throw new Error("User ID is undefined. Please log in again");
            return await patchPhysicalAppearance(userId, arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message || "Failed to update" });
                console.error("Update About Me 2 error:", error);
            },
            onSuccess: () => {
                showSuccess("About Me updated successfully!");
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (values: AboutMe2Form, callback?: () => void) => {
        try {
            const result = await trigger(values);
            if (result) {
                showSuccess("About Me updated successfully!");
                callback?.();
            }
        } catch (error: unknown) {
            if (error instanceof Error)
                showError({ message: error.message });
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
