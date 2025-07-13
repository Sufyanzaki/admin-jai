import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {showError} from "@/admin-utils/lib/formErrors";
import {showSuccess} from "@/admin-utils/lib/formSuccess";
import {createBanner} from "@/app/(dashboard)/marketing/banners/_api/createBanner";
import useSWRMutation from "swr/mutation";
import { useState, useCallback } from "react";

const bannerSchema = z.object({
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

export type BannerFormValues = z.infer<typeof bannerSchema>;

type CreateBannerProps = {
    name: string;
    link: string;
    bannerImage: string;
    startDate: string;
    endDate: string;
    cpm: number;
    page: string;
    isActive: boolean;
}

export default function useBannerForm() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const { trigger, isMutating } = useSWRMutation(
        'createBanner',
        async (_, { arg }: { arg: CreateBannerProps }) => {  // Changed url to _ since it's unused
          return await createBanner(arg);
        },
        {
          onError: (error: Error) => {  // More specific error type
            showError({message: error.message});
            console.error('Banner creation error:', error);
          },
          revalidate: false,
          populateCache: false
        }
      );

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        setValue,
        reset,
        watch,
    } = useForm<BannerFormValues>({
        resolver: zodResolver(bannerSchema),
        defaultValues: {
            name: "",
            link: "",
            bannerImage: "",
            startDate: "",
            endDate: "",
            cpm: 0,
            page: "home",
            isActive: true,
        },
        mode: 'onBlur'
    });

    const handleFileChange = useCallback((file: File | null) => {
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
            // Only set the form value if it's different from current value
            setValue("bannerImage", "https://example.com/images/banner.jpg", { shouldValidate: false });
        } else {
            setImagePreview("");
            // Don't update form value when file is null (cancelled selection)
        }
    }, [setValue]);

    const handleDateRangeChange = (startDate: string, endDate: string) => {
        setValue("startDate", startDate);
        setValue("endDate", endDate);
    };



    const onSubmit = async (values: BannerFormValues, callback?: (data: {status: number} | undefined) => void) => {
        try {
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

            if (result) {
                showSuccess('Banner created successfully!');
                reset();
                setSelectedFile(null);
                setImagePreview("");
                callback?.(result);
            }
        } catch (error: any) {
            showError({message: error.message});
            console.error('Banner creation error:', error);
        }
    };

    return {
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        register,
        setValue,
        watch,
        selectedFile,
        imagePreview,
        handleFileChange,
        handleDateRangeChange,
    };
} 