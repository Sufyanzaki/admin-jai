import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {showError} from "@/admin-utils/lib/formErrors";
import {showSuccess} from "@/admin-utils/lib/formSuccess";
import {updateBanner} from "@/app/(dashboard)/marketing/banners/_api/updateBanner";
import useSWRMutation from "swr/mutation";
import { useState, useEffect, useCallback } from "react";
import { useBannerDetails } from "./useBannerDetails";

const editBannerSchema = z.object({
    name: z.string()
        .min(1, "Banner name is required")
        .min(2, "Banner name must be at least 2 characters"),
    link: z.string()
        .min(1, "Link is required")
        .url("Please enter a valid URL"),
    bannerImage: z.string()
        .min(1, "Banner image is required"),
    startDate: z.string()
        .min(1, "Start date is required"),
    endDate: z.string()
        .min(1, "End date is required"),
    cpm: z.number()
        .min(0, "CPM must be a positive number"),
    page: z.string()
        .min(1, "Page selection is required"),
    isActive: z.boolean()
        .default(true),
}).refine((data) => new Date(data.startDate) < new Date(data.endDate), {
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

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
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
            startDate: "",
            endDate: "",
            cpm: 0,
            page: "homepage",
            isActive: true,
        },
        mode: 'onBlur'
    });

    useEffect(() => {
        if(!banner) return;

        reset({
            name: banner.name,
            link: banner.link,
            bannerImage: banner.bannerImage,
            startDate: banner.startDate.split('T')[0] + 'T' + banner.startDate.split('T')[1].substring(0, 5),
            endDate: banner.endDate.split('T')[0] + 'T' + banner.endDate.split('T')[1].substring(0, 5),
            cpm: banner.cpm,
            page: banner.page,
            isActive: banner.isActive,
        });
        setImagePreview(banner.bannerImage);
        
    }, [banner]);

    const handleFileChange = useCallback((file: File | null) => {
        setSelectedFile(file);
        if (file) {
            setValue("bannerImage", "https://example.com/images/banner.jpg", { shouldValidate: false });
        }
        // Don't update form value when file is null (cancelled selection)
    }, [setValue]);

    const handleDateRangeChange = (startDate: string, endDate: string) => {
        setValue("startDate", startDate);
        setValue("endDate", endDate);
    };

    const onSubmit = async (values: EditBannerFormValues, callback?: (data: {status: number} | undefined) => void) => {
        try {
            console.log('Edit banner form submitted', values);

            const result = await trigger({
                name: values.name,
                link: values.link,
                bannerImage: values.bannerImage,
                startDate: values.startDate,
                endDate: values.endDate,
                cpm: values.cpm,
                page: values.page,
                isActive: values.isActive,
            });

            if (result?.status === 200) {
                showSuccess('Banner updated successfully!');
                setSelectedFile(null);
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
        selectedFile,
        imagePreview,
        handleFileChange,
        handleDateRangeChange,
        banner,
    };
} 