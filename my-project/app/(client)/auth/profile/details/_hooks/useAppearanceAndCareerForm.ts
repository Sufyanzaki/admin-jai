import {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import useSWRMutation from 'swr/mutation';
import {showError} from '@/shared-lib';
import {useRouter} from 'next/navigation';

import {patchPhysicalAppearance, postPhysicalAppearance} from '@/app/shared-api/physicalAppearanceApi';
import {patchEducationCareer, postEducationCareer} from '@/app/shared-api/educationCareerApi';
import {patchLanguageInfo, postLanguageInfo} from '@/app/shared-api/languageInfoApi';
import {useSession} from "next-auth/react";
import {usePhysicalAppearanceInfo} from "@/app/shared-hooks/usePhysicalAppearanceInfo";
import {useEducationCareerInfo} from "@/app/shared-hooks/useEducationCareerInfo";
import {useLanguageInfoInfo} from "@/app/shared-hooks/useLanguageInfoInfo";
import {getUserTrackingId, updateUserTrackingId} from "@/lib/access-token";
import {patchUser} from "@/app/shared-api/userApi";

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
    primarySpecialization: z.string().min(1, {
        message: "Please select Specialization"
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
            const tracker = getUserTrackingId();

            const physicalApi = tracker?.step2 ? patchPhysicalAppearance : postPhysicalAppearance
            const languageApi = tracker?.step2 ? patchLanguageInfo : postLanguageInfo
            const appearanceApi = tracker?.step2 ? patchEducationCareer : postEducationCareer

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
                primarySpecialization,
                department,
            } = arg;

            setCurrentStep('Saving physical appearance & education');

            await Promise.all([
                patchUser(userId, { route: "/auth/profile/details" }),
                physicalApi(userId, {
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
                languageApi(userId, {
                    motherTongue,
                    knownLanguages: knownLanguages.join(", "),
                }),
                appearanceApi(userId, {
                    primarySpecialization,
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
            primarySpecialization: "",
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
