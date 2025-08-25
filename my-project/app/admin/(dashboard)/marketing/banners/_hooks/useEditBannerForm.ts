"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { updateBanner } from "@/app/admin/(dashboard)/marketing/banners/_api/bannerApi";
import useSWRMutation from "swr/mutation";
import { useEffect } from "react";
import { useBannerDetails } from "./useBannerDetails";
import { imageUpload } from "@/admin-utils/utils/imageUpload";


type UpdateBannerProps = {
    name: string;
    link: string;
    bannerImage: string;
    startDate: string;
    endDate: string;
    cpm: number;
    page: string;
    isActive: boolean;
}

export default function useEditBannerForm(id: string) {

    const { t } = require('react-i18next');
    const editBannerSchema = z.object({
        name: z.string()
            .min(1, t("Banner name is required"))
            .min(2, t("Banner name must be at least 2 characters")),
        link: z.string()
            .min(1, t("Link is required"))
            .url(t("Please enter a valid URL")),
        bannerImage: z.union([
            z.string().min(1, t("Banner image is required")),
            z.instanceof(File, { message: t("Banner image is required") })
        ]),
        startDate: z.date({
            required_error: t("Start date is required"),
        }),
        endDate: z.date({
            required_error: t("End date is required"),
        }),
        cpm: z.number()
            .min(0, t("CPM must be a positive number")),
        page: z.string()
            .min(1, t("Page selection is required")),
        isActive: z.boolean()
            .default(true),
        dateRange: z.any().optional(), // For the DateRangePicker controller
    }).refine((data) => data.startDate < data.endDate, {
        message: t("End date must be after start date"),
        path: ["endDate"],
    });

    type EditBannerFormValues = z.infer<typeof editBannerSchema>;


    const { banner, bannerLoading } = useBannerDetails(id);
    const { trigger, isMutating } = useSWRMutation(
        'updateBanner',
        async (url: string, { arg }: { arg: UpdateBannerProps }) => {
            return await updateBanner(id, arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: t(error.message) });
                console.error('Banner update error:', error);
            }
        }
    );
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        setValue,
        reset,
        watch,
        control,
    } = useForm<EditBannerFormValues>({
        resolver: zodResolver(editBannerSchema),
        defaultValues: {
            name: "",
            link: "",
            bannerImage: "",
            startDate: new Date(),
            endDate: new Date(),
            cpm: 0,
            page: "homepage",
            isActive: true,
            dateRange: undefined,
        },
        mode: 'onBlur'
    });
    useEffect(() => {
        if (!banner) return;
        reset({
            name: banner.name,
            link: banner.link,
            bannerImage: banner.bannerImage,
            startDate: new Date(banner.startDate),
            endDate: new Date(banner.endDate),
            cpm: banner.cpm,
            page: banner.page,
            isActive: banner.isActive,
            dateRange: {
                from: new Date(banner.startDate),
                to: new Date(banner.endDate)
            }
        });
    }, [banner, reset]);
    const onSubmit = async (values: EditBannerFormValues, bannerImageFile: File | null, callback?: () => void) => {
        try {
            let bannerImageUrl = typeof values.bannerImage === 'string' ? values.bannerImage : '';
            if (values.bannerImage instanceof File) {
                bannerImageUrl = await imageUpload(values.bannerImage);
            }
            const result = await trigger({
                name: values.name,
                link: values.link,
                bannerImage: bannerImageUrl,
                startDate: values.startDate.toISOString(),
                endDate: values.endDate.toISOString(),
                cpm: values.cpm,
                page: values.page,
                isActive: values.isActive,
            });
            if (result) {
                showSuccess(t('Banner updated successfully!'));
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
        isLoading: isSubmitting || isMutating || bannerLoading,
        register,
        setValue,
        watch,
        control,
        banner,
    };
} 