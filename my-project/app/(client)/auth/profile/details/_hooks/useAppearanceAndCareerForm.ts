import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useSWRMutation from 'swr/mutation';
import { showError, showSuccess } from '@/shared-lib';
import { useRouter } from 'next/navigation';

// APIs
import { postPhysicalAppearance } from '@/app/shared-api/physicalAppearanceApi';
import { postEducationCareer } from '@/app/shared-api/educationCareerApi';
import { postLanguageInfo } from '@/app/shared-api/languageInfoApi';

// --------------------
// Zod Schema
// --------------------
export const appearanceCareerSchema = z.object({
    // Physical appearance
    height: z.string().min(1),
    eyeColor: z.string().min(1),
    hairColor: z.string().min(1),
    bodyType: z.string().min(1),
    weight: z.string().min(1),
    appearance: z.string().min(1),
    clothing: z.string().min(1),
    intelligence: z.string().min(1),
    //language
    motherTongue: z.string().min(1),
    knownLanguages: z.array(z.string()).min(1, "Select at least one language"),    // Education / career
    education: z.string().min(1),
    department: z.string().min(1),
});

export type AppearanceCareerForm = z.infer<typeof appearanceCareerSchema>;

// --------------------
// Hook
// --------------------
export default function useAppearanceAndCareerForm(userId: string) {
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState<string | null>(null);

    const { trigger, isMutating } = useSWRMutation(
        'clientCreateAppearanceCareer',
        async (_: string, { arg }: { arg: AppearanceCareerForm }) => {
            // if (!userId || typeof userId !== 'string') {
            //     throw new Error('User ID is missing or invalid.');
            // }

            const {
                height,
                eyeColor,
                hairColor,
                bodyType,
                weight,
                appearance,
                clothing,
                intelligence,
                knownLanguages,
                motherTongue,
                education,
                department,
            } = arg;

            setCurrentStep('Saving physical appearance & education');

            // Send both requests in parallel
            await Promise.all([
                postPhysicalAppearance(userId, {
                    height,
                    eyeColor,
                    hairColor,
                    bodyType,
                    weight,
                    appearance,
                    clothing,
                    intelligence,
                    language: motherTongue,
                }),
                postLanguageInfo(userId, {
                    motherTongue,
                    knownLanguages: knownLanguages.join(", "),
                }),
                postEducationCareer(userId, {
                    education,
                    department,
                }),
            ]);

            return true;
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message });
                console.error('Appearance/Career creation error:', error);
            },
            onSuccess: () => {
                showSuccess('Profile details updated successfully!');
                router.push("/auth/profile/description");
                setCurrentStep(null);
            },
            revalidate: false,
            populateCache: false,
        }
    );

    // --------------------
    // React Hook Form
    // --------------------
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        reset,
        setValue,
        watch,
        control,
    } = useForm<AppearanceCareerForm>({
        resolver: zodResolver(appearanceCareerSchema),
        defaultValues: {
            height: "5'10\"",
            eyeColor: 'Brown',
            hairColor: 'Black',
            bodyType: 'Athletic',
            weight: '70kg',
            appearance: 'Attractive',
            clothing: 'Casual',
            intelligence: 'High',
            motherTongue: 'Fluent English',
            knownLanguages: "",
            education: 'MIT, Stanford University',
            department: 'Engineering',
        },
        mode: 'onBlur',
    });

    // --------------------
    // Submit handler
    // --------------------
    const onSubmit = useCallback(
        async (values: AppearanceCareerForm, callback?: () => void) => {
            try {
                const result = await trigger(values);
                if (result) {
                    callback?.();
                }
            } catch (error) {
                if (error instanceof Error) {
                    showError({ message: error.message });
                }
            } finally {
                setCurrentStep(null);
            }
        },
        [trigger]
    );

    return {
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        currentStep,
        register,
        setValue,
        control,
        watch,
        reset,
    };
}
