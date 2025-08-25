"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError, showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from "react";
import { createFooterSection, updateFooterSection } from "@/app/shared-api/footerApi";
import { useFooterSectionSetting } from "@/app/shared-hooks/useFooterSectionSetting";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import { FooterSectionDto } from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";
import { useTranslation } from "react-i18next";


export function useFooterSectionForm() {
    const { t } = useTranslation();

    const footerSectionFormSchema = z.object({
        sectionName: z.string().min(1, t("Section name is required")),
        pageNames: z.array(
            z.object({
                title: z.string(),
                url: z.string(),
            })
        ).min(1, t("At least one page must be selected")),
    });

    type FooterSectionFormValues = z.infer<typeof footerSectionFormSchema>;

    const { mutate: globalMutate } = useSWRConfig();

    const searchParams = useSearchParams();
    const editId = searchParams.get("editId") ?? undefined;

    const { isLoading, data } = useFooterSectionSetting(editId)

    const [error, setError] = useState<string | null>(null);

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        reset,
        control,
        register,
        watch,
    } = useForm<FooterSectionFormValues>({
        resolver: zodResolver(footerSectionFormSchema),
        defaultValues: {
            sectionName: "",
            pageNames: [],
        },
        mode: "onBlur",
    });

    const { trigger, isMutating } = useSWRMutation(
        "createFooterSection",
        async (_: string, { arg }: { arg: FooterSectionFormValues }) => {
            try {
                const payload = {
                    sectionName: arg.sectionName,
                    pageNames: arg.pageNames.map((p) => p.title).join(","),
                    pagesLinks: arg.pageNames.map((p) => p.url).join(","),
                };
                if (editId) return await updateFooterSection(editId, payload);
                return await createFooterSection(payload)
            } catch (error: unknown) {
                // @ts-expect-error unknown type
                showError({ message: t(error.message) }); setError(error.message); throw new Error(error.message);
            }
        },
        {
            onError: (error: unknown) => {
                // @ts-expect-error unknown type
                showError({ message: t(error.message) }); setError(error.message); throw new Error(error.message);

            },
            onSuccess: () => {
                showSuccess(t("Footer section updated successfully!"));
            },
            revalidate: false,
            populateCache: false,
        }
    );

    useEffect(() => {
        if (!data) return;
        const pageNamesArray = data.pageNames ? data.pageNames.split(',') : [];
        const pagesLinksArray = data.pagesLinks ? data.pagesLinks.split(',') : [];

        const formattedPageNames = pageNamesArray.map((title: string, index: number) => ({
            title: title.trim(),
            url: pagesLinksArray[index] ? pagesLinksArray[index].trim() : '#'
        }));

        reset({
            sectionName: data.sectionName || "",
            pageNames: formattedPageNames
        });
    }, [data, reset]);

    const onSubmit = async (
        values: FooterSectionFormValues,
        callback?: () => void
    ) => {
        setError(null);

        try {
            const r = await trigger(values);
            callback?.();
            if (!r) throw new Error("Failed to create footer section");
            globalMutate(
                "footer-all-settings",
                (current: FooterSectionDto[] = []) => {
                    if (editId) {
                        return current.map(item =>
                            item.id.toString() === editId
                                ? {
                                    ...item,
                                    sectionName: values.sectionName,
                                    pageNames: values.pageNames.map(p => p.title).join(","),
                                    pagesLinks: values.pageNames.map(p => p.url).join(","),
                                    updatedAt: new Date().toISOString(),
                                }
                                : item
                        );
                    } else {
                        return [
                            ...current,
                            {
                                id: r.id ?? Date.now(),
                                sectionName: values.sectionName,
                                pageNames: values.pageNames.map(p => p.title).join(","),
                                pagesLinks: values.pageNames.map(p => p.url).join(","),
                                footerId: r.footerId ?? 1,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                            },
                        ];
                    }
                },
                false
            ).finally();
        } catch (error: unknown) {
            // @ts-expect-error unknown type
            showError({ message: t(error.message) }); setError(error.message); throw new Error(error.message);
        }
    };

    return {
        handleSubmit,
        register,
        errors,
        isSubmitting: isSubmitting || isMutating,
        setValue,
        reset,
        control,
        watch,
        onSubmit,
        error,
        isFetching: isLoading,
        trigger,
    };
}

