"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useSession} from "next-auth/react";
import {showError} from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import {patchPartnerExpectation} from "@/app/shared-api/partnerExpectationApi";
import {updateUserTrackingId} from "@/lib/access-token";
import {usePartnerExpectations} from "@/app/admin/(dashboard)/members/_hooks/usepartnerExpectations";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {patchUser} from "@/app/shared-api/userApi";

export const partnerFormSchema = z.object({
    origin: z.string().min(1, "Origin is required"),
    lookingFor: z.string().min(1, "Looking for is required"),
    relationshipStatus: z.string().min(1, "Relationship status is required"),
    religion: z.string().min(1, "Religion is required"),
    ageFrom: z.number().min(18).max(100),
    ageTo: z.number().min(18).max(100),
    weight: z.string().min(1, "Weight is required"),
    education: z.string().min(1, "Education is required"),
    smoke: z.string().min(1, "Required"),
    drinking: z.string().min(1, "Required"),
    goingOut: z.string().min(1, "Required"),
    children: z.string().optional(),
    searchWithIn: z.number().optional(),
    length: z.string().min(1, "Height is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().optional(),
    state: z.string().min(1, "State is required")
});

export type PartnerFormValues = z.infer<typeof partnerFormSchema>;

export default function usePartnerForm() {

    const router = useRouter();

    const { data: session } = useSession();
    const userId = session?.user.id ? String(session.user.id) : undefined;
    const userIdProp = userId;

    const {expectations, expectationLoading} = usePartnerExpectations(userIdProp);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
        setValue,
        watch,
        reset,
        trigger,
    } = useForm<PartnerFormValues>({
        resolver: zodResolver(partnerFormSchema),
        defaultValues: {
            origin: "",
            lookingFor: "",
            relationshipStatus: "Single",
            religion: "",
            ageFrom: 25,
            ageTo: 35,
            weight: "Average",
            education: "",
            smoke: "",
            drinking: "",
            goingOut: "",
            children: "",
            searchWithIn: 1,
            length: "Permanent",
            country: "",
            city: "",
            state: ""
        },
        mode: "onBlur"
    });

    useEffect(() => {
        if(!expectations) return;

        const { lookingFor, origin, relationshipStatus, religion, ageTo, ageFrom, length, weight, education, smoke, drinking, goingOut, city, state, country } = expectations;

        reset({
            origin,
            lookingFor,
            relationshipStatus,
            religion,
            ageFrom,
            ageTo,
            weight,
            education,
            smoke,
            drinking,
            goingOut,
            // children,
            // searchWithIn,
            length,
            country,
            city,
            state
        })

    }, [expectations, reset]);

    const { trigger: mutate, isMutating } = useSWRMutation(
        "updatePartnerPreferences",
        async (_, { arg }: { arg: PartnerFormValues }) => {
            if (!userId) {
                throw new Error("User not authenticated");
            }

            const payload = {
                origin: arg.origin,
                lookingFor: arg.lookingFor,
                relationshipStatus: arg.relationshipStatus,
                religion: arg.religion,
                ageFrom: arg.ageFrom,
                ageTo: arg.ageTo,
                weight: arg.weight,
                education: arg.education,
                smoke: arg.smoke,
                drinking: arg.drinking,
                goingOut: arg.goingOut,
                // children: arg.children,
                // searchWithIn: arg.searchWithIn,
                length: arg.length,
                country: arg.country,
                city: arg.city,
                state: arg.state
            };
            patchUser(userId, {route: "/auth/profile/partner-preferences"}).finally()
            return await patchPartnerExpectation(userId, payload);
        },
        {
            onError: (error: Error) => showError({ message: error.message || "Failed to update partner preferences" }),
            onSuccess: () => {},
            revalidate: false
        }
    );

    const onSubmit = async (values: PartnerFormValues) => {

        // if(!isDirty){
        //     router.push("/auth/profile/membership");
        //     return
        // }

        const isValid = await trigger();
        if (!isValid) return;
        await mutate(values);
        updateUserTrackingId({ step6: true })
        router.push("/auth/profile/membership");
    };

    return {
        control,
        handleSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        setValue,
        watch,
        onSubmit,
        trigger,
        isFetching: expectationLoading,
    };
}