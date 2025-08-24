"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";

import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { usePreferenceSettings } from "@/app/admin/(dashboard)/settings/_hooks/usePreferenceSetting";
import { patchPreferenceSettings } from "@/app/admin/(dashboard)/settings/_api/preferences";

export default function usePreferenceSettingsForm() {

    const { t } = useTranslation();

    const preferenceSettingsSchema = z.object({
        maintenanceMode: z.boolean(),
        defaultCurrency: z.string().min(1, t("Default currency is required")),
        defaultLanguage: z.string().min(1, t("Default language is required")),
    });

    type PreferenceSettingsFormValues = z.infer<typeof preferenceSettingsSchema>;

    const {
        data: preferenceSettings,
        loading,
        mutate,
    } = usePreferenceSettings();

    const {
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors, isSubmitting },
        reset,
        register,
    } = useForm<PreferenceSettingsFormValues>({
        resolver: zodResolver(preferenceSettingsSchema),
        defaultValues: {
            maintenanceMode: false,
            defaultCurrency: "",
            defaultLanguage: "",
        },
        mode: "onBlur",
    });

    useEffect(() => {
        if (preferenceSettings) {
            reset({
                maintenanceMode: preferenceSettings.maintenanceMode ?? false,
                defaultCurrency: preferenceSettings.defaultCurrency || "",
                defaultLanguage: preferenceSettings.defaultLanguage || "",
            });
        }
    }, [preferenceSettings, reset]);

    const { trigger, isMutating } = useSWRMutation(
        "preference-setting-form",
        async (_: string, { arg }: { arg: PreferenceSettingsFormValues }) => {
            return await patchPreferenceSettings(arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message ? t(error.message) : t("Failed to save preference settings") });
                console.error("Preference settings error:", error);
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (values: PreferenceSettingsFormValues) => {
        const result = await trigger(values);
        if (result?.status === 200 || result?.status === 201) {
            showSuccess(t("Preference settings saved successfully!"));
            mutate(); // re-fetch settings
            reset(values); // reset form
        }
    };

    return {
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating || loading,
        setValue,
        watch,
        reset,
        control,
        register,
        loading,
    };
}
