'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from 'react';
import { patchAgendaSettings } from "../_api/agendaApi";
import { useAgenda } from "./useAgenda";
import { imageUpload } from '@/admin-utils/utils/imageUpload';

const agendaFormSchema = z.object({
    Title: z.string().min(1, 'Title is required'),
    pageTitle: z.string().min(1, 'Page title is required'),
    pageSubtitle: z.string().min(1, 'Page subtitle is required'),
    titleContentSection: z.string().min(1, 'Content section title is required'),
    link: z.string().min(1, 'Link is required'),
    content: z.string().min(1, 'Content is required'),
    metaTitle: z.string().min(1, 'Meta title is required'),
    metaDescription: z.string().min(1, 'Meta description is required'),
    keywords: z.string().min(1, 'Keywords are required'),
    metaImage: z.any().optional(),
    pageType: z.string().min(1, 'Page type is required'),
    showOnHeader: z.boolean()
});

type AgendaFormValues = z.infer<typeof agendaFormSchema>;

export default function useAgendaForm() {
    const { agendaSettings, mutate } = useAgenda();

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
            onError: (error: any) => {
                showError({ message: error.message });
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
                showSuccess('Agenda settings updated successfully!');
            }
        } catch (error) {
            showError({ message: "Upload failed. Please try again." });
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
