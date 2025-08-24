'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from 'react';
import { imageUpload } from '@/admin-utils/utils/imageUpload';
import { useAgenda } from "@/app/shared-hooks/useAgenda";
import { patchAgendaSettings } from "@/app/shared-api/agendaApi";


export default function useAgendaForm() {
    const { agendaSettings, mutate } = useAgenda();

    const { t } = require('react-i18next');
    const agendaFormSchema = z.object({
        Title: z.string().min(1, t('Title is required')),
        pageTitle: z.string().min(1, t('Page title is required')),
        pageSubtitle: z.string().min(1, t('Page subtitle is required')),
        titleContentSection: z.string().min(1, t('Content section title is required')),
        link: z.string().min(1, t('Link is required')),
        content: z.string().min(1, t('Content is required')),
        metaTitle: z.string().min(1, t('Meta title is required')),
        metaDescription: z.string().min(1, t('Meta description is required')),
        keywords: z.string().min(1, t('Keywords are required')),
        metaImage: z.any().optional(),
        pageType: z.string().min(1, t('Page type is required')),
        showOnHeader: z.boolean()
    });

    type AgendaFormValues = z.infer<typeof agendaFormSchema>;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        control,
        formState: { errors },
    } = useForm<AgendaFormValues>({
        resolver: zodResolver(agendaFormSchema),
        defaultValues: {
            Title: '',
            pageTitle: '',
            pageSubtitle: '',
            titleContentSection: '',
            link: '',
            content: '',
            metaTitle: '',
            metaDescription: '',
            keywords: '',
            metaImage: '',
            pageType: 'Public',
            showOnHeader: true
        },
    });

    const [isUploading, setIsUploading] = useState(false);

    const { trigger, isMutating } = useSWRMutation(
        'updateAgendaSettings',
        async (url: string, { arg }: { arg: AgendaFormValues }) => {
            return await patchAgendaSettings(arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: t(error.message) });
                console.error('Agenda settings update error:', error);
            }
        }
    );

    // Reset form with fetched data
    useEffect(() => {
        if (agendaSettings) {
            reset({
                Title: agendaSettings.Title || '',
                pageTitle: agendaSettings.pageTitle || '',
                pageSubtitle: agendaSettings.pageSubtitle || '',
                titleContentSection: agendaSettings.titleContentSection || '',
                link: agendaSettings.link || '',
                content: agendaSettings.content || '',
                metaTitle: agendaSettings.metaTitle || '',
                metaDescription: agendaSettings.metaDescription || '',
                keywords: agendaSettings.keywords || '',
                metaImage: agendaSettings.metaImage || '',
                pageType: agendaSettings.pageType || 'Public',
                showOnHeader: agendaSettings.showOnHeader ?? true
            });
        }
    }, [agendaSettings, reset]);

    const onSubmit = async (values: AgendaFormValues) => {
        let metaImageUrl = values.metaImage;

        try {
            if (values.metaImage instanceof File) {
                setIsUploading(true);
                metaImageUrl = await imageUpload(values.metaImage);
            }

            const payload = {
                ...values,
                metaImage: metaImageUrl,
            };

            const result = await trigger(payload);
            if (result) {
                await mutate();
                showSuccess(t('Agenda settings updated successfully!'));
            }
        } catch (error) {
            showError({ message: t("Upload failed. Please try again.") });
        } finally {
            setIsUploading(false);
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
        onSubmit,
    };
}
