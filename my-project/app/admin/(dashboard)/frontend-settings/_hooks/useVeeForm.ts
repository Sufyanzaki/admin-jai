'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from 'react';
import { imageUpload } from '@/admin-utils/utils/imageUpload';
import { useVee } from '@/app/shared-hooks/useVee';
import { patchVeeSettings } from "@/app/shared-api/veeApi";
import { useTranslation } from 'react-i18next';

export default function useVeeForm() {

    const { t } = useTranslation();
    const veeFormSchema = z.object({
        Title: z.string().min(1, t('Title is required')),
        PageContentitle: z.string().min(1, t('Page content title is required')),
        link: z.string().min(1, t('Link is required')),
        content: z.string().min(1, t('Content is required')),
        metaTitle: z.string().min(1, t('Meta title is required')),
        metaDescription: z.string().min(1, t('Meta description is required')),
        keywords: z.string().min(1, t('Keywords are required')),
        metaImage: z.any().optional(),
        pageType: z.string().min(1, t('Page type is required')),
        pageName: z.string().min(1, t('Page name is required')),
    });

    type VeeFormValues = z.infer<typeof veeFormSchema>;

    const { veeData, mutate, veeLoading } = useVee();
    const [isUploading, setIsUploading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        control,
        formState: { errors },
    } = useForm<VeeFormValues>({
        resolver: zodResolver(veeFormSchema),
        defaultValues: {
            Title: '',
            PageContentitle: '',
            link: '',
            content: '',
            metaTitle: '',
            metaDescription: '',
            keywords: '',
            metaImage: '',
            pageType: 'static',
            pageName: '',
        },
    });

    const { trigger, isMutating } = useSWRMutation(
        'updateVeeSettings',
        async (url: string, { arg }: { arg: VeeFormValues }) => {
            return await patchVeeSettings(arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: t(error.message) });
                console.error('Vee settings update error:', error);
            }
        }
    );

    useEffect(() => {
        if (veeData) {
            reset({
                Title: veeData.Title || '',
                PageContentitle: veeData.PageContentitle || '',
                link: veeData.link || '',
                content: veeData.content || '',
                metaTitle: veeData.metaTitle || '',
                metaDescription: veeData.metaDescription || '',
                keywords: veeData.keywords || '',
                metaImage: veeData.metaImage || '',
                pageType: veeData.pageType || 'static',
                pageName: veeData.pageName || '',
            });
        }
    }, [veeData, reset]);

    const onSubmit = async (values: VeeFormValues) => {
        try {
            let metaImageUrl = values.metaImage;

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
                showSuccess(t('Vee page settings updated successfully!'));
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
        isLoading: isMutating || isUploading,
        isUploading,
        isFormSubmitting: isMutating,
        onSubmit,
        veeLoading
    };
}
