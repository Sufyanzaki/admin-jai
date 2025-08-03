"use client"

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {showError} from "@/admin-utils/lib/formErrors";
import {showSuccess} from "@/admin-utils/lib/formSuccess";
import {updateBanner} from "@/app/(dashboard)/marketing/banners/_api/updateBanner";
import useSWRMutation from "swr/mutation";
import { useEffect } from "react";
import { useBannerDetails } from "./useBannerDetails";
import {imageUpload} from "@/admin-utils/utils/imageUpload";

const editBannerSchema = z.object({
    name: z.string()
        .min(1, "Banner name is required")
        .min(2, "Banner name must be at least 2 characters"),
    link: z.string()
        .min(1, "Link is required")
        .url("Please enter a valid URL"),
    bannerImage: z.union([
        z.string().min(1, "Banner image is required"),
        z.instanceof(File, { message: "Banner image is required" })
    ]),
    startDate: z.date({
        required_error: "Start date is required",
    }),
    endDate: z.date({
        required_error: "End date is required",
    }),
    cpm: z.number()
        .min(0, "CPM must be a positive number"),
    page: z.string()
        .min(1, "Page selection is required"),
    isActive: z.boolean()
        .default(true),
    dateRange: z.any().optional(), // For the DateRangePicker controller
}).refine((data) => data.startDate < data.endDate, {
    message: "End date must be after start date",
    path: ["endDate"],
});

export type EditBannerFormValues = z.infer<typeof editBannerSchema>;

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
    const { banner, bannerLoading } = useBannerDetails(id);
    const { trigger, isMutating } = useSWRMutation(
        'updateBanner',
        async (url: string, { arg }: { arg: UpdateBannerProps }) => {
            return await updateBanner(id, arg);
        },
        {
            onError: (error: any) => {
                showError({message: error.message});
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
        if(!banner) return;
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
    const onSubmit = async (values: EditBannerFormValues, bannerImageFile: File | null, callback?: (data: {status: number} | undefined) => void) => {
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
            if (result?.status === 200) {
                showSuccess('Banner updated successfully!');
                callback?.(result);
            }
        } catch (error: any) {
            showError({message: error.message});
            console.error('Banner update error:', error);
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