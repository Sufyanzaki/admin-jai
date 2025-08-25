"use client";

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { showError } from '@/shared-lib';
import useSWRMutation from 'swr/mutation';
import { patchUser } from "@/app/shared-api/userApi";
import { patchPartnerExpectation, postPartnerExpectation } from "@/app/shared-api/partnerExpectationApi";
import { useRouter } from "next/navigation";
import { patchUserLocation, postUserLocation } from "@/app/shared-api/livingApi";
import { useSession } from "next-auth/react";
import { useLiving } from "@/app/admin/(dashboard)/members/_hooks/useLiving";
import { usePartnerExpectations } from "@/app/admin/(dashboard)/members/_hooks/usepartnerExpectations";
import { useBasicInfo } from "@/app/shared-hooks/useBasicInfo";
import { setUserTrackingId } from "@/lib/access-token";

export default function useProfileCreateForm() {
    const { t } = useTranslation();

    const { data: session, status } = useSession();
    const userId = session?.user.id ? String(session.user.id) : undefined;
    const userIdProp = userId;
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<string | null>(null);

    const { living, livingLoading } = useLiving(userIdProp);
    const { expectations, expectationLoading } = usePartnerExpectations(userIdProp);
    const { user, userLoading } = useBasicInfo(userIdProp);

    useEffect(() => {
        if (!user) return;
        if (user?.route === "/auth/profile/partner-preferences") {
            router.push("/dashboard");
        } else if (user?.route) {
            router.push(user.route);
        }
    }, [user?.route, router]);

    const userProfileCreateSchema = z.object({
        username: z.string().min(1, t("Username is required")),
        firstName: z.string().min(1, t("First name is required")),
        lastName: z.string().min(1, t("Last name is required")),
        gender: z.string().min(1, t("Gender is required")),
        age: z.number({ required_error: t("Age is required"), invalid_type_error: t("Age must be a number") })
            .int(t("Age must be a whole number"))
            .min(0, t("Age must be a positive number")),
        dob: z.string({ required_error: t("Date of birth is required") })
            .regex(/^\d{4}-\d{2}-\d{2}$/, t("Date of birth must be in the format YYYY-MM-DD")),
        relationshipStatus: z.string().min(1, t("Relationship status is required")),
        children: z.string().min(1, t("Children is required")),
        religion: z.string().min(1, t("Religion is required")),
        origin: z.string().min(1, t("Country of origin is required")),
        lookingFor: z.string().min(1, t("Looking for field is required")),
        country: z.string().min(1, t("Country is required")),
        city: z.string().min(1, t("City is required")),
        state: z.string().optional(),
    });

    const { trigger, isMutating } = useSWRMutation(
        'clientCreateUserProfile',
        async (_: string, { arg }: { arg: z.infer<typeof userProfileCreateSchema> }) => {
            if (!userId) return;
            const { lookingFor, city, country, state, ...userFields } = arg;
            setCurrentStep(t("Updating user & Saving preferences"));
            const livingApi = living ? patchUserLocation : postUserLocation;
            const partnerApi = expectations ? patchPartnerExpectation : postPartnerExpectation;
            await Promise.all([
                livingApi(userId, { city, country, state }),
                patchUser(userId, { ...userFields, route: "/auth/profile/create" }),
                partnerApi(userId, { lookingFor }),
            ]);
            return true;
        },
        {
            onError: (error: Error) => showError({ message: error.message }),
            onSuccess: () => setCurrentStep(null),
            revalidate: false,
            populateCache: false,
        }
    );

    const {
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
        register,
        setValue,
        watch,
        control,
        reset
    } = useForm<z.infer<typeof userProfileCreateSchema>>({
        resolver: zodResolver(userProfileCreateSchema),
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
            gender: "Male",
            age: 18,
            dob: "",
            relationshipStatus: "Single",
            children: "",
            religion: "",
            origin: "",
            lookingFor: "",
            country: "",
            state: "",
            city: "",
        },
        mode: 'onBlur',
    });

    useEffect(() => {
        if (!user || !living || !expectations) return;

        const { firstName, lastName, username, gender, age, dob, relationshipStatus, children, religion, origin } = user;
        const { country, state, city } = living;
        const { lookingFor } = expectations;

        reset({
            username,
            firstName,
            lastName,
            gender,
            relationshipStatus,
            age,
            dob: dob ? dob.split("T")[0] : "",
            children: children ?? "",
            religion,
            origin,
            lookingFor,
            country,
            state,
            city,
        });
    }, [user, expectations, living, reset]);

    const onSubmit = useCallback(
        async (values: z.infer<typeof userProfileCreateSchema>, callback?: () => void) => {
            try {
                const result = await trigger(values);
                if (result) {
                    setUserTrackingId({
                        id: userId!,
                        step1: true,
                        step2: false,
                        step3: false,
                        step4: false,
                        step5: false,
                        step6: false,
                    });
                    callback?.();
                    router.push("/auth/profile/details");
                }
            } catch (error) {
                if (error instanceof Error) showError({ message: error.message });
            } finally {
                setCurrentStep(null);
            }
        },
        [trigger, router, userId]
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
        isFetching: status === 'loading' || livingLoading || expectationLoading || userLoading,
    };
}
