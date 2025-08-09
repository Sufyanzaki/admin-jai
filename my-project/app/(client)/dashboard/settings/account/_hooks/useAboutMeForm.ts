"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError, showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import {patchUser} from "@/app/shared-api/userApi";
import {useSession} from "next-auth/react";
import {useBasicInfo} from "@/app/shared-hooks/useBasicInfo";
import {useEffect} from "react";

const aboutMeSchema = z.object({
    shortDescription: z
        .string()
        .min(1, "Short description is required")
        .max(500, "Short description cannot exceed 500 characters"),
});

export type AboutMeFormValues = z.infer<typeof aboutMeSchema>;

type UpdateAboutMeProps = {
    shortDescription: string;
};

export default function useAboutMeForm() {

    const {data:session} = useSession();

    const userId = session?.user?.id ? String(session.user.id) : undefined;

    const {user, userLoading} = useBasicInfo(userId);

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        reset,
    } = useForm<AboutMeFormValues>({
        resolver: zodResolver(aboutMeSchema),
        defaultValues: {
            shortDescription: "",
        },
        mode: "onBlur",
    });

    useEffect(() => {

        if(!user) return;

        reset({
            shortDescription: user.shortDescription
        })
    }, [user])

    const { trigger, isMutating } = useSWRMutation(
        "updateAboutMe",
        async (_, { arg }: { arg: UpdateAboutMeProps }) => {
            if(!userId) throw new Error("User ID is undefined. Please log in again")
            return await patchUser(userId, arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message || "Failed to update" });
                console.error("Update About Me error:", error);
            },
            onSuccess: () => {
                showSuccess("About Me updated successfully!");
                reset();
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (values: AboutMeFormValues, callback?: () => void) => {
        try {
            const result = await trigger({
                shortDescription: values.shortDescription,
            });

            if (result) {
                showSuccess("About Me updated successfully!");
                callback?.();
            }
        } catch (error: unknown) {
            if (error instanceof Error) showError({ message: error.message });
        }
    };

    return {
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        register,
        isFetching: userLoading,
    };
}
