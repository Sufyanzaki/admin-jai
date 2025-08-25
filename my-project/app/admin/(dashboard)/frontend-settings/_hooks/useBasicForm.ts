'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useSWRMutation from "swr/mutation";
import { useState } from 'react';
import { imageUpload } from '@/admin-utils/utils/imageUpload';
import { showError, showSuccess } from "@/shared-lib";
import { postBasicPage } from '@/app/shared-api/basicPageApi';
import { useTranslation } from 'react-i18next';

export default function useBasicForm() {

    const { t } = useTranslation();
    const basicFormSchema = z.object({
        Title: z.string().min(1, t('Title is required')),
        Url: z.string().min(1, t('URL is required')),
        content: z.string().min(1, t('Content is required')),
        metaTitle: z.string().min(1, t('Meta title is required')),
        metaDescription: z.string().min(1, t('Meta description is required')),
        keywords: z.string().min(1, t('Keywords are required')),
        metaImage: z.any().optional(),
        pageType: z.enum(['Public', 'Private', 'Draft']),
        isActive: z.boolean()
    });

    type BasicFormValues = z.infer<typeof basicFormSchema>;
    const [isUploading, setIsUploading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
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

    const { trigger, isMutating } = useSWRMutation('createBasicPage',
        async (url: string, { arg }: { arg: BasicFormValues }) => {
            return await postBasicPage({ ...arg, Url: `${process.env.NEXT_APP_BASE}/page/${arg.Url}` });
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

        try {
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
                showSuccess(t('Basic page added successfully!'));
            }
        } catch (error: unknown) {
            // @ts-expect-error unknown type
            showError({ message: t(error.message) });
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
        isFormSubmitting: isMutating,
        isUploading,
        onSubmit,
    };
}