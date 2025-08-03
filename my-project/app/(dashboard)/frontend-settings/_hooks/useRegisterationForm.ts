'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { useEffect } from 'react';
import { imageUpload } from '@/admin-utils/utils/imageUpload';
import {patchRegistrationPageSettings} from "@/app/(dashboard)/frontend-settings/_api/registerationApi";
import {useRegisteration} from "@/app/(dashboard)/frontend-settings/_hooks/useRegisteration";

const registrationFormSchema = z.object({
    Title: z.string().min(1, 'Title is required'),
    Url: z.string().min(1, 'URL is required'),
    showOnHeader: z.boolean(),
    isActive: z.boolean(),
    bannerImage: z.any().optional(),

    step1Title: z.string().min(1, 'Step 1 title is required'),
    step1Description: z.string().min(1, 'Step 1 description is required'),

    step2Title: z.string().min(1, 'Step 2 title is required'),
    step2Description: z.string().min(1, 'Step 2 description is required'),

    step3Title: z.string().min(1, 'Step 3 title is required'),
    step3Description: z.string().min(1, 'Step 3 description is required'),

    step4Title: z.string().min(1, 'Step 4 title is required'),
    step4Description: z.string().min(1, 'Step 4 description is required'),

    myImageTitle: z.string().min(1, 'Image title is required'),
    myImageDescription: z.string().min(1, 'Image description is required'),

    myDescriptionTitle: z.string().min(1, 'Description title is required'),
    myDescriptionPlaceholder: z.string().min(1, 'Description placeholder is required'),

    step5Title: z.string().min(1, 'Step 5 title is required'),
    step5Description: z.string().min(1, 'Step 5 description is required'),

    step6Title: z.string().min(1, 'Step 6 title is required'),
    step6Description: z.string().min(1, 'Step 6 description is required'),

    step7Title: z.string().min(1, 'Step 7 title is required'),
    step7Description: z.string().min(1, 'Step 7 description is required'),
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

export default function useRegistrationForm() {
    const { registrationSettings, mutate, loading } = useRegisteration();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        control,
        formState: { errors },
    } = useForm<RegistrationFormValues>({
        resolver: zodResolver(registrationFormSchema),
        defaultValues: {
            Title: '',
            Url: '',
            showOnHeader: true,
            isActive: true,
            bannerImage: '',
            step1Title: '',
            step1Description: '',
            step2Title: '',
            step2Description: '',
            step3Title: '',
            step3Description: '',
            step4Title: '',
            step4Description: '',
            myImageTitle: '',
            myImageDescription: '',
            myDescriptionTitle: '',
            myDescriptionPlaceholder: '',
            step5Title: '',
            step5Description: '',
            step6Title: '',
            step6Description: '',
            step7Title: '',
            step7Description: '',
        },
    });

    const { trigger, isMutating } = useSWRMutation(
        'updateRegistrationSettings',
        async (url: string, { arg }: { arg: RegistrationFormValues }) => {
            return await patchRegistrationPageSettings(arg);
        },
        {
            onError: (error: any) => {
                showError({ message: error.message });
                console.error('Registration settings update error:', error);
            }
        }
    );

    // Reset form with fetched data
    useEffect(() => {
        if (registrationSettings) {
            reset({
                Title: registrationSettings.Title || '',
                Url: registrationSettings.Url || '',
                showOnHeader: registrationSettings.showOnHeader ?? true,
                isActive: registrationSettings.isActive ?? true,
                bannerImage: registrationSettings.bannerImage || '',
                step1Title: registrationSettings.step1Title || '',
                step1Description: registrationSettings.step1Description || '',
                step2Title: registrationSettings.step2Title || '',
                step2Description: registrationSettings.step2Description || '',
                step3Title: registrationSettings.step3Title || '',
                step3Description: registrationSettings.step3Description || '',
                step4Title: registrationSettings.step4Title || '',
                step4Description: registrationSettings.step4Description || '',
                myImageTitle: registrationSettings.myImageTitle || '',
                myImageDescription: registrationSettings.myImageDescription || '',
                myDescriptionTitle: registrationSettings.myDescriptionTitle || '',
                myDescriptionPlaceholder: registrationSettings.myDescriptionPlaceholder || '',
                step5Title: registrationSettings.step5Title || '',
                step5Description: registrationSettings.step5Description || '',
                step6Title: registrationSettings.step6Title || '',
                step6Description: registrationSettings.step6Description || '',
                step7Title: registrationSettings.step7Title || '',
                step7Description: registrationSettings.step7Description || '',
            });
        }
    }, [registrationSettings, reset]);

    const onSubmit = async (values: RegistrationFormValues) => {
        let bannerImageUrl = values.bannerImage;

        if (values.bannerImage instanceof File) {
            bannerImageUrl = await imageUpload(values.bannerImage);
        }

        const payload = {
            ...values,
            bannerImage: bannerImageUrl,
        };

        const result = await trigger(payload);
        if (result) {
            await mutate();
            showSuccess('Registration settings updated successfully!');
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
        loading
    };
}