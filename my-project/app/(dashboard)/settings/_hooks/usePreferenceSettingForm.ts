"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";

import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import {usePreferenceSettings} from "@/app/(dashboard)/settings/_hooks/usePreferenceSetting";
import {patchPreferenceSettings} from "@/app/(dashboard)/settings/_api/preferences";

export const preferenceSettingsSchema = z.object({
    maintenanceMode: z.boolean(),
    defaultCurrency: z.string().min(1, "Default currency is required"),
    defaultLanguage: z.string().min(1, "Default language is required"),
});

export type PreferenceSettingsFormValues = z.infer<typeof preferenceSettingsSchema>;

export default function usePreferenceSettingsForm() {
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
                showError({ message: error.message });
                console.error("Preference settings error:", error);
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (values: PreferenceSettingsFormValues) => {
        const result = await trigger(values);
        if (result?.status === 200 || result?.status === 201) {
            showSuccess("Preference settings saved successfully!");
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
