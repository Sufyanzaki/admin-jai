import {useState, useCallback, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useSWRMutation from 'swr/mutation';
import { showError, showSuccess } from '@/shared-lib';
import { useRouter } from 'next/navigation';

import { postPhysicalAppearance } from '@/app/shared-api/physicalAppearanceApi';
import { postEducationCareer } from '@/app/shared-api/educationCareerApi';
import { postLanguageInfo } from '@/app/shared-api/languageInfoApi';
import {useSession} from "next-auth/react";
import {usePhysicalAppearanceInfo} from "@/app/admin/(dashboard)/members/_hooks/usePhysicalAppearanceInfo";
import {useEducationCareerInfo} from "@/app/admin/(dashboard)/members/_hooks/useEducationCareerInfo";
import {useLanguageInfoInfo} from "@/app/admin/(dashboard)/members/_hooks/useLanguageInfoInfo";
import {updateUserTrackingId} from "@/lib/access-token";

export const appearanceCareerSchema = z.object({
    height: z.string().min(1, {
        message: "Please enter your height"
    }),
    eyeColor: z.string().min(1, {
        message: "Please select your eye color"
    }),
    hairColor: z.string().min(1, {
        message: "Please select your hair color"
    }),
    bodyType: z.string().min(1, {
        message: "Please select your body type"
    }),
    weight: z.string().min(1, {
        message: "Please enter your weight"
    }),
    appearance: z.string().min(1, {
        message: "Please describe your appearance"
    }),
    clothing: z.string().min(1, {
        message: "Please select your clothing style"
    }),
    intelligence: z.string().min(1, {
        message: "Please select your intelligence level"
    }),
    motherTongue: z.string().min(1, {
        message: "Please enter your mother tongue"
    }),
    knownLanguages: z
        .any()
        .refine((val) => Array.isArray(val) && val.length > 0, {
            message: "Please select at least one language you know"
        })
        .pipe(z.array(z.string()).min(1, {
            message: "Please select at least one language"
        })),
    education: z.string().min(1, {
        message: "Please select your education level"
    }),
    department: z.string().min(1, {
        message: "Please enter your work experience"
    }),
});

export type AppearanceCareerForm = z.infer<typeof appearanceCareerSchema>;

export default function useAppearanceAndCareerForm() {
    const router = useRouter();

    const { data: session } = useSession();
    const userId = session?.user.id ? String(session.user.id) : undefined;

    const [currentStep, setCurrentStep] = useState<string | null>(null);

    const {physicalAppearance, physicalAppearanceLoading} = usePhysicalAppearanceInfo();
    const {educationCareer, educationCareerLoading} = useEducationCareerInfo();
    const {languageInfo, languageInfoLoading} = useLanguageInfoInfo()

    const { trigger, isMutating } = useSWRMutation(
        'clientCreateAppearanceCareer',
        async (_: string, { arg }: { arg: AppearanceCareerForm }) => {
            if (!userId) throw new Error('User ID is missing or invalid.');

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
            height: "",
            eyeColor: "",
            hairColor: "",
            bodyType: "",
            weight: "",
            appearance: "",
            clothing: "",
            intelligence: "",
            motherTongue: "",
            knownLanguages: [],
            education: "",
            department: "",
        },
        mode: 'onBlur',
    });

    useEffect(() => {
        if (!physicalAppearance || !languageInfo) return;

        const {
            height,
            eyeColor,
            hairColor,
            appearance,
            weight,
            bodyType,
            intelligence,
            clothing,
        } = physicalAppearance;

        const { motherTongue, knownLanguages } = languageInfo;
        const education = educationCareer?.education ?? "";
        const department = educationCareer?.department ?? "";

        reset({
            height,
            eyeColor,
            hairColor,
            appearance,
            weight,
            bodyType,
            intelligence,
            clothing,
            motherTongue,
            knownLanguages: knownLanguages? knownLanguages.split(",") : [],
            education,
            department,
        });
    }, [physicalAppearance, languageInfo, educationCareer, reset]);


    const onSubmit = useCallback(
        async (values: AppearanceCareerForm, callback?: () => void) => {
            try {
                const result = await trigger(values);
                if (result) {
                    updateUserTrackingId({ step2: true })
                    showSuccess('Profile details updated successfully!');
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
        isLoading: physicalAppearanceLoading || educationCareerLoading || languageInfoLoading,
        currentStep,
        register,
        setValue,
        control,
        watch,
        reset,
        isSubmitting: isSubmitting || isMutating,
    };
}
