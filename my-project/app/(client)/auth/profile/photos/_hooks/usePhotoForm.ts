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
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useBasicInfo} from "@/app/shared-hooks/useBasicInfo";
import {toArray} from "@/lib/utils";

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

    const router = useRouter();

    const { data: session, update: updateSession} = useSession();
    const userId = session?.user.id ? String(session.user.id) : undefined;
    const userIdProp = userId;

    const {user, userLoading} = useBasicInfo(userIdProp);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        reset,
        watch,
        trigger
    } = useForm<PhotoFormValues>({
        resolver: zodResolver(photoFormSchema),
        defaultValues: {
            images: []
        },
        mode: "onBlur"
    });

    useEffect(() => {
        if (!user) return;

        const {image} = user;
        reset({ images:toArray(image) })

    }, [user, reset]);

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

            const strImages = validImageUrls.join(",");

            await patchUser(userId, {
                image: strImages
            });

            return strImages
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
        const images = await mutate(values);
        if(user){
            updateSession({
                ...session,
                user: {
                    ...session?.user,
                    firstName: user.firstName,
                    lastName : user.lastName,
                    image: images
                }
            }).finally();
        }
        updateUserTrackingId({ step5: true })
        router.push("/auth/profile/partner-preferences");
    };

    return {
        control,
        handleSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        setValue,
        watch,
        isFetching: userLoading,
        onSubmit,
        images: watch("images") || []
    };
}