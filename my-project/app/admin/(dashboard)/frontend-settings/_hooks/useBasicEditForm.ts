'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useSWRMutation from "swr/mutation";
import { imageUpload } from '@/admin-utils/utils/imageUpload';
import { showError, showSuccess } from "@/shared-lib";
import { patchBasicPage } from '@/app/shared-api/basicPageApi';
import { useParams } from "next/navigation";
import { useBasicPage } from "@/app/admin/(dashboard)/frontend-settings/_hooks/useBasicPage";
import { useEffect } from "react";

export default function useBasicEditForm() {

    const { t } = require('react-i18next');
    const basicFormSchema = z.object({
        Title: z.string().min(1, t('Title is required')),
        Url: z.string().url(t('Invalid URL format')).min(1, t('URL is required')),
        content: z.string().min(1, t('Content is required')),
        metaTitle: z.string().min(1, t('Meta title is required')),
        metaDescription: z.string().min(1, t('Meta description is required')),
        keywords: z.string().min(1, t('Keywords are required')),
        metaImage: z.any().optional(),
        pageType: z.string().min(1, t('Type is required')),
        isActive: z.boolean()
    });

    type BasicFormValues = z.infer<typeof basicFormSchema>;

    const params = useParams();
    const id = params.id as string;

    const { basicPage, isLoading: pageLoading } = useBasicPage(id);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        reset,
        formState: { errors },
    } = useForm<BasicFormValues>({
        resolver: zodResolver(basicFormSchema),
        defaultValues: {
            Title: '',
            Url: '',
            content: '',
            metaTitle: '',
            metaDescription: '',
            keywords: '',
            metaImage: '',
            pageType: 'Public',
            isActive: true
        },
    });

    useEffect(() => {

        if (!basicPage) return;

        reset({
            Title: basicPage.Title,
            Url: basicPage.Url,
            content: basicPage.content,
            metaTitle: basicPage.metaTitle,
            metaDescription: basicPage.metaDescription,
            keywords: basicPage.keywords,
            metaImage: basicPage.metaImage,
            pageType: basicPage.pageType,
            isActive: basicPage.isActive
        })
    }, [basicPage]);

    const { trigger, isMutating } = useSWRMutation('patchBasicPage',
        async (url: string, { arg }: { arg: BasicFormValues }) => {
            return await patchBasicPage({ ...arg, id })
        },
        {
            onError: (error: Error) => {
                showError({ message: t(error.message) });
                console.error('Basic page update error:', error);
            }
        }
    );

    const onSubmit = async (values: BasicFormValues) => {
        let metaImageUrl = values.metaImage;

        if (values.metaImage instanceof File) {
            metaImageUrl = await imageUpload(values.metaImage);
        }

        const payload = {
            ...values,
            metaImage: metaImageUrl,
        };

        const result = await trigger(payload);
        if (result) {
            showSuccess(t('Page updated successfully!'));
        }
    };

    return {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        errors,
        isLoading: isMutating,
        onSubmit,
        pageLoading
    };
}