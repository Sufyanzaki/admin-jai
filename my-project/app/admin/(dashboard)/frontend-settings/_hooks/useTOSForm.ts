'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from 'react';
import { imageUpload } from '@/admin-utils/utils/imageUpload';
import { patchTermsConditionsSettings } from '@/app/shared-api/tosApi';
import { useTOS } from '@/app/shared-hooks/useTOS';

export default function useTOSForm() {


    const { t } = require('react-i18next');
    const tosFormSchema = z.object({
        Title: z.string().min(1, t('Title is required')),
        Url: z.string().min(1, t('URL is required')),
        showOnHeader: z.boolean(),
        isActive: z.boolean(),
        pageSectiontitle: z.string().min(1, t('Section title is required')),
        link: z.string().min(1, t('Link is required')),
        content: z.string().min(1, t('Content is required')),
        metaTitle: z.string().min(1, t('Meta title is required')),
        metaDescription: z.string().min(1, t('Meta description is required')),
        keywords: z.string().min(1, t('Keywords are required')),
        metaImage: z.any().optional(),
        pageType: z.literal('terms'),
    });

    type TOSFormValues = z.infer<typeof tosFormSchema>;

    const { tosSettings, mutate, tosLoading } = useTOS();
    const [isUploading, setIsUploading] = useState(false); // New state for image upload

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        control,
        formState: { errors },
    } = useForm<TOSFormValues>({
        resolver: zodResolver(tosFormSchema),
        defaultValues: {
            Title: '',
            Url: '',
            showOnHeader: true,
            isActive: true,
            pageSectiontitle: '',
            link: '',
            content: '',
            metaTitle: '',
            metaDescription: '',
            keywords: '',
            metaImage: '',
            pageType: 'terms',
        },
    });

    const { trigger, isMutating } = useSWRMutation(
        'updateTOSSettings',
        async (url: string, { arg }: { arg: TOSFormValues }) => {
            return await patchTermsConditionsSettings(arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: t(error.message) });
                console.error('TOS settings update error:', error);
            }
        }
    );

    useEffect(() => {
        if (tosSettings) {
            reset({
                Title: tosSettings.Title || '',
                Url: tosSettings.Url || '',
                showOnHeader: tosSettings.showOnHeader ?? true,
                isActive: tosSettings.isActive ?? true,
                pageSectiontitle: tosSettings.pageSectiontitle || '',
                link: tosSettings.link || '',
                content: tosSettings.content || '',
                metaTitle: tosSettings.metaTitle || '',
                metaDescription: tosSettings.metaDescription || '',
                keywords: tosSettings.keywords || '',
                metaImage: tosSettings.metaImage || '',
                pageType: 'terms',
            });
        }
    }, [tosSettings, reset]);

    const onSubmit = async (values: TOSFormValues) => {
        try {
            let metaImageUrl = values.metaImage;

            // Start image upload loading
            if (values.metaImage instanceof File) {
                setIsUploading(true);
                metaImageUrl = await imageUpload(values.metaImage);
                setIsUploading(false);
            }

            const payload = {
                ...values,
                metaImage: metaImageUrl,
            };

            const result = await trigger(payload);
            if (result) {
                await mutate();
                showSuccess(t('Terms of Service settings updated successfully!'));
            }
        } catch (error) {
            setIsUploading(false);
            showError({ message: t('Failed to upload image') });
            console.error('Image upload error:', error);
        }
    };

    return {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        errors,
        isLoading: isMutating || isUploading, // Combined loading state
        isUploading, // Separate image upload state
        isFormSubmitting: isMutating, // Separate form submission state
        onSubmit,
        tosLoading,
    };
}