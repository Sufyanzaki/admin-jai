"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { showError, showSuccess } from "@/shared-lib";
import {updatePhoto} from "@/app/(client)/dashboard/settings/photo/_api/photoSettingsApi";
import {useEffect} from "react";
import {usePhotoSettings} from "@/app/(client)/dashboard/settings/photo/_hooks/usePhotoSettings";

const photoPrivacySchema = z.object({
    onlyMembersWithPhotoCanSee: z.boolean(),
    onlyVipCanSee: z.boolean(),
    blurForFreeMembers: z.boolean(),
    onRequestOnly: z.boolean(),
});

export type PhotoPrivacyFormValues = z.infer<typeof photoPrivacySchema>;

export default function usePhotoPrivacyForm() {

    const { photoSettings, photoSettingsLoading } = usePhotoSettings();

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isDirty },
        reset,
        setValue,
        getValues,
    } = useForm<PhotoPrivacyFormValues>({
        resolver: zodResolver(photoPrivacySchema),
        defaultValues: {
            onlyMembersWithPhotoCanSee: true,
            onlyVipCanSee: false,
            blurForFreeMembers: true,
            onRequestOnly: false,
        },
        mode: "onChange",
    });

    useEffect(() => {
        if(!photoSettings) return;

        const {onlyMembersWithPhotoCanSee, onRequestOnly, onlyVipCanSee, blurForFreeMembers} = photoSettings;

        reset({
            onlyMembersWithPhotoCanSee,
            onlyVipCanSee,
            blurForFreeMembers,
            onRequestOnly,
        })

    }, [photoSettings, reset]);

    const { trigger, isMutating } = useSWRMutation(
        "updatePhotoPrivacySettings",
        async (_, { arg }: { arg: PhotoPrivacyFormValues }) => {
            return await updatePhoto(arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message || "Failed to update privacy settings" });
                console.error("Privacy settings error:", error);
            },
            onSuccess: () => {
                showSuccess("Privacy settings updated successfully!");
            },
        }
    );

    const onSubmit = async (values: PhotoPrivacyFormValues, callback?: () => void) => {
        const result = await trigger(values);
        if (result) {
            callback?.();
        }
    };

    const toggleSetting = (field: keyof PhotoPrivacyFormValues) => {
        const currentValue = getValues(field);
        setValue(field, !currentValue, { shouldDirty: true });
    };

    return {
        control,
        register,
        handleSubmit,
        watch,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        isDirty,
        reset,
        toggleSetting,
        getValues,
        setValue,
        isFetching:photoSettingsLoading
    };
}