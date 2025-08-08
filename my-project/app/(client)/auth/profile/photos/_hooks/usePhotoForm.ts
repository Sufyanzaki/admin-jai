"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { showError, showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { patchUser } from "@/app/shared-api/userApi";
import { updateUserTrackingId } from "@/lib/access-token";
import { imageUpload } from "@/admin-utils/utils/imageUpload";

export const photoFormSchema = z.object({
    images: z.array(
        z.union([
            z.instanceof(File),
            z.string().url()
        ])
    ).optional()
});

export type PhotoFormValues = z.infer<typeof photoFormSchema>;

export default function usePhotoForm() {
    const { data: session } = useSession();
    const userId = session?.user.id ? String(session.user.id) : undefined;

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
        trigger
    } = useForm<PhotoFormValues>({
        resolver: zodResolver(photoFormSchema),
        defaultValues: {
            images: []
        },
        mode: "onBlur"
    });

    const { trigger: mutate, isMutating } = useSWRMutation(
        "updateUserPhotos",
        async (_, { arg }: { arg: PhotoFormValues }) => {
            if (!userId) {
                throw new Error("User not authenticated");
            }

            const processedImages = await Promise.all(
                (arg.images || []).map(async (image) => {
                    if (image instanceof File) return await imageUpload(image);
                    return image;
                })
            );

            const validImageUrls = processedImages.filter((url): url is string => !!url);

            if (validImageUrls.length === 0)  new Error("No valid images to upload");

            return await patchUser(userId, {
                image: validImageUrls.join(",")
            });
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message || "Failed to update photos" });
            },
            onSuccess: () => {
                showSuccess("Photos updated successfully!");
            },
            revalidate: false
        }
    );

    const onSubmit = async (values: PhotoFormValues) => {
        const isValid = await trigger();
        if (!isValid) return;
        await mutate(values);
        updateUserTrackingId({ step5: true })
    };

    return {
        control,
        handleSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        setValue,
        watch,
        onSubmit,
        images: watch("images") || []
    };
}