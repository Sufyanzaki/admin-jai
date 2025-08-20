"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError, showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from "react";
import {useFooterSectionSetting} from "@/app/admin/(dashboard)/settings/other-settings/_hooks/useFooterSectionSetting";

const footerSectionFormSchema = z.object({
    pageNames: z.array(
        z.object({
            title: z.string(),
            url: z.string(),
        })
    ).min(1, "At least one page must be selected"),
});

export type FooterSectionFormValues = z.infer<typeof footerSectionFormSchema>;

export function useFooterSectionForm() {
    const { data: footerSectionData, isLoading: isLoadingFooterSectionData } = useFooterSectionSetting(1);

    console.log(footerSectionData)

    const [error, setError] = useState<string | null>(null);

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        reset,
        control,
        watch,
    } = useForm<FooterSectionFormValues>({
        resolver: zodResolver(footerSectionFormSchema),
        defaultValues: {
            pageNames: [],
        },
        mode: "onBlur",
    });

    // Prefill form from API
    useEffect(() => {
        if (footerSectionData?.data.pageNames) {
            const titles = footerSectionData.data.pageNames
                .split(",")
                .map((t: string) => t.trim());

            const urls = (footerSectionData.data.pagesLinks || "")
                .split(",")
                .map((u: string) => u.trim());

            const sectionPageArray = titles.map((title, idx) => ({
                title,
                url: urls[idx] || "",
            }));

            reset({
                pageNames: sectionPageArray,
            });
        }
    }, [footerSectionData, reset]);

    // SWR mutation for save
    const { trigger, isMutating } = useSWRMutation(
        "patchFooterSectionSettings",
        async (_: string, { arg }: { arg: FooterSectionFormValues }) => {
            try {
                const payload = {
                    ...footerSectionData?.data,
                    pageNames: arg.pageNames.map((p) => p.title).join(","),
                    pagesLinks: arg.pageNames.map((p) => p.url).join(","),
                };
                return await patchFooterSectionSettings(payload);
            } catch (error: unknown) {
                const message =
                    error instanceof Error ? error.message : "Something went wrong";
                showError({ message });
            }
        },
        {
            onError: (error: unknown) => {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Failed to update footer section settings";
                setError(message);
                showError({ message });
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (
        values: FooterSectionFormValues,
        callback?: () => void
    ) => {
        setError(null);

        try {
            await trigger(values);
            showSuccess("Footer section updated successfully!");
            callback?.();
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to update footer section";
            showError({ message });
        }
    };

    return {
        handleSubmit,
        errors,
        isLoading: isSubmitting || isMutating || isLoadingFooterSectionData,
        setValue,
        reset,
        control,
        watch,
        onSubmit,
        error,
        trigger,
        footerSectionData,
        isLoadingFooterSectionData,
    };
}
