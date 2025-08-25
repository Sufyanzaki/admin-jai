"use client"

import { useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { updateProfile } from "@/app/admin/(dashboard)/profile/_api/updateProfile";
import useSWRMutation from "swr/mutation";
import { imageUpload } from "@/admin-utils/utils/imageUpload";
import { isFile } from "@/lib/utils";
import { useEffect } from 'react';
import { patchUserLocation } from "@/app/shared-api/livingApi";
import { useProfile } from "@/app/shared-hooks/useProfile";


export default function useProfileForm() {
    const { t } = useTranslation();

    const profileSchema = z.object({
        firstName: z.string()
            .min(1, t("First name is required"))
            .min(2, t("First name must be at least 2 characters")),
        lastName: z.string()
            .min(1, t("Last name is required"))
            .min(2, t("Last name must be at least 2 characters")),
        email: z.string()
            .min(1, t("Email is required"))
            .email(t("Please enter a valid email address")),
        city: z.string().min(1, t("City is required")),
        state: z.string().optional(),
        country: z.string().min(1, t("Country is Required")),
        image: z.any().optional(),
    });

    type ProfileFormValues = z.infer<typeof profileSchema>;

    const { response, mutate } = useProfile();

    const { trigger, isMutating } = useSWRMutation(
        'updateProfile',
        async (url: string, { arg }: { arg: ProfileFormValues }) => {
            if (!response) throw new Error(t('User not found. Please refresh the page and try again.'))
            const { country, city, state, image, email, lastName, firstName } = arg;
            await patchUserLocation(response.user.id, { country, city, state })
            return await updateProfile(response.user.id, { image, email, lastName, firstName });
        },
        {
            onError: (error: Error) => {
                showError({ message: t(error.message) });
                console.error('Profile update error:', error);
            }
        }
    );

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        setValue,
        watch,
        reset,
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            city: "",
            state: "",
            country: ""
        },
        mode: 'onBlur'
    });

    useEffect(() => {
        if (!response) return;
        const { user } = response;

        reset({
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            email: user.email ?? "",
            city: user.living?.city ?? "",
            state: user.living?.state ?? "",
            country: user.living?.country ?? "",
        });
    }, [response, reset]);

    const onSubmit = async (values: ProfileFormValues, callback?: () => void) => {
        try {
            let imageUrl: string | undefined;

            if (values.image && isFile(values.image)) {
                imageUrl = await imageUpload(values.image);
            }

            const result = await trigger({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                image: imageUrl,
                city: values.city,
                state: values.state,
                country: values.country,
            });

            if (result) {
                await mutate();
                showSuccess(t('Profile updated successfully!'));
                callback?.();
            }
        } catch (error: unknown) {
            // @ts-expect-error unknown type
            showError({ message: t(error.message) });
        }
    };

    return {
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        register,
        setValue,
        watch
    };
} 