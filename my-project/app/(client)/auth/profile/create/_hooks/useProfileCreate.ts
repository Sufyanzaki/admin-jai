import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showError, showSuccess } from '@/shared-lib';
import useSWRMutation from 'swr/mutation';
import { patchUser } from "@/app/shared-api/userApi";
import { patchPartnerExpectation } from "@/app/shared-api/partnerExpectationApi";
import { useRouter } from "next/navigation";
import { patchUserLocation } from "@/app/shared-api/livingApi";
import { useSession } from "next-auth/react";
import { useLiving } from "@/app/admin/(dashboard)/members/_hooks/useLiving";
import { usePartnerExpectations } from "@/app/admin/(dashboard)/members/_hooks/usepartnerExpectations";
import { useBasicInfo } from "@/app/shared-hooks/useBasicInfo";
import { setUserTrackingId } from "@/lib/access-token";

export const userProfileCreateSchema = z.object({
    username: z.string().min(1, "Username is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    gender: z.string().min(1, "Gender is required"),
    age: z
        .number({ required_error: "Age is required", invalid_type_error: "Age must be a number" })
        .int("Age must be a whole number")
        .min(0, "Age must be a positive number"),
    dob: z
        .string({ required_error: "Date of birth is required" })
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in the format YYYY-MM-DD"),
    relationshipStatus: z.string().min(1, "Relationship status is required"),
    children: z.string().min(1, "Children is required"),
    religion: z.string().min(1, "Religion is required"),
    origin: z.string().min(1, "Country of origin is required"),
    lookingFor: z.string().min(1, "Looking for field is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().optional(),
});

export type UserProfile = z.infer<typeof userProfileCreateSchema>;

export default function useProfileCreateForm() {

    const { data: session, status } = useSession();

    const userId = session?.user.id ? String(session.user.id) : undefined;
    const userIdProp = userId;

    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<string | null>(null);

    const { living, livingLoading } = useLiving(userIdProp);
    const { expectations, expectationLoading } = usePartnerExpectations(userIdProp);
    const { user, userLoading } = useBasicInfo(userIdProp)

    // useEffect(() => {
    //     if (!user) return;
    //     if (user?.route === "/auth/profile/partner-preferences") {
    //         router.push("/dashboard");
    //     }
    //     else if (user?.route) {
    //         router.push(user.route);
    //     }
    // }, [user?.route, router]);


    const { trigger, isMutating } = useSWRMutation(
        'clientCreateUserProfile',
        async (_: string, { arg }: { arg: UserProfile }) => {

            if (!userId) return;
            const { lookingFor, city, country, state, children, ...userFields } = arg;
            setCurrentStep("Updating user & Saving preferences");
            await Promise.all([
                patchUserLocation(userId, { city, country, state }),
                patchUser(userId, { ...userFields, route: "/auth/profile/create" }),
                patchPartnerExpectation(userId, { lookingFor }),
            ]);
            return true;
        },
        {
            onError: (error: Error) => showError({ message: error.message }),
            onSuccess: () => { setCurrentStep(null) },
            revalidate: false,
            populateCache: false,
        }
    );

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        setValue,
        watch,
        control,
        reset
    } = useForm<UserProfile>({
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
            children : children ?? "",
            religion,
            origin,
            lookingFor,
            country,
            state,
            city,
        })
    }, [user, expectations, living, reset]);

    const onSubmit = useCallback(
        async (values: UserProfile, callback?: () => void) => {
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
        [trigger, router]
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
    }
}