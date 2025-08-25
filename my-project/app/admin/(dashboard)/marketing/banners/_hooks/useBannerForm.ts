import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { createBanner } from "@/app/admin/(dashboard)/marketing/banners/_api/bannerApi";
import { imageUpload } from "@/admin-utils/utils/imageUpload";
import useSWRMutation from "swr/mutation";
import { useState, useCallback } from "react";
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const bannerSchema = z.object({
        name: z.string()
            .min(1, t("Banner name is required"))
            .min(2, t("Banner name must be at least 2 characters")),
        link: z.string()
            .min(1, t("Link is required"))
            .url(t("Please enter a valid URL")),
        bannerImage: z.string()
            .min(1, t("Banner image is required")),
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
        dateRange: z.any().optional(),
    }).refine((data) => data.startDate < data.endDate, {
        message: t("End date must be after start date"),
        path: ["endDate"],
    });

    type BannerFormValues = z.infer<typeof bannerSchema>;

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const { trigger, isMutating } = useSWRMutation(
        'createBanner',
        async (_, { arg }: { arg: CreateBannerProps }) => {
            return await createBanner(arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: t(error.message) });
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
        control,
    } = useForm<BannerFormValues>({
        resolver: zodResolver(bannerSchema),
        defaultValues: {
            name: "",
            link: "",
            bannerImage: "",
            startDate: new Date(),
            endDate: new Date(),
            cpm: 0,
            page: "home",
            isActive: true,
            dateRange: undefined,
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
            setValue("bannerImage", "pending-upload", { shouldValidate: false });
        } else {
            setImagePreview("");
            setValue("bannerImage", "", { shouldValidate: true });
        }
    }, [setValue]);

    const onSubmit = async (values: BannerFormValues, callback?: () => void) => {
        try {
            let bannerImageUrl = values.bannerImage;
            if (selectedFile instanceof File) {
                bannerImageUrl = await imageUpload(selectedFile);
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
                showSuccess(t('Banner created successfully!'));
                reset();
                setSelectedFile(null);
                setImagePreview("");
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
        watch,
        control,
        selectedFile,
        imagePreview,
        handleFileChange,
    };
}