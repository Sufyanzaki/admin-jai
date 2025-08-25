"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { showError } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { patchPartnerExpectation } from "@/app/shared-api/partnerExpectationApi";
import { updateUserTrackingId } from "@/lib/access-token";
import { usePartnerExpectations } from "@/app/admin/(dashboard)/members/_hooks/usepartnerExpectations";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { patchUser } from "@/app/shared-api/userApi";
import { useTranslation } from "react-i18next";

export default function usePartnerForm() {
    const { t } = useTranslation();

    const router = useRouter();
    const { data: session } = useSession();
    const userId = session?.user.id ? String(session.user.id) : undefined;
    const userIdProp = userId;

    const { expectations, expectationLoading } = usePartnerExpectations(userIdProp);

    const partnerFormSchema = z.object({
        origin: z.string().min(1, t("Origin is required")),
        lookingFor: z.string().min(1, t("Looking for is required")),
        relationshipStatus: z.string().min(1, t("Relationship status is required")),
        religion: z.string().min(1, t("Religion is required")),
        ageFrom: z.number().min(18, t("Minimum age is 18")).max(100, t("Maximum age is 100")),
        ageTo: z.number().min(18, t("Minimum age is 18")).max(100, t("Maximum age is 100")),
        weight: z.string().min(1, t("Weight is required")),
        education: z.string().min(1, t("Education is required")),
        smoke: z.string().min(1, t("Required")),
        drinking: z.string().min(1, t("Required")),
        goingOut: z.string().min(1, t("Required")),
        children: z.string().optional(),
        searchWithIn: z.number().optional(),
        length: z.string().min(1, t("Height is required")),
        country: z.string().min(1, t("Country is required")),
        city: z.string().min(1, t("City is required")),
        state: z.string().optional(),
    });

    type PartnerFormValues = z.infer<typeof partnerFormSchema>;

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
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
            state: "",
        },
        mode: "onBlur",
    });

    useEffect(() => {
        if (!expectations) return;

        reset({
            origin: expectations.origin ?? "",
            lookingFor: expectations.lookingFor ?? "",
            relationshipStatus: expectations.relationshipStatus ?? "",
            religion: expectations.religion ?? "",
            ageFrom: expectations.ageFrom ?? 25,
            ageTo: expectations.ageTo ?? 35,
            weight: expectations.weight ?? "",
            education: expectations.education ?? "",
            smoke: expectations.smoke ?? "",
            drinking: expectations.drinking ?? "",
            goingOut: expectations.goingOut ?? "",
            length: expectations.length ?? "",
            country: expectations.country ?? "",
            city: expectations.city ?? "",
            state: expectations.state ?? "",
        });
    }, [expectations, reset]);

    const { trigger: mutate, isMutating } = useSWRMutation(
        "updatePartnerPreferences",
        async (_, { arg }: { arg: PartnerFormValues }) => {
            if (!userId) {
                throw new Error(t("User not authenticated"));
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
                length: arg.length,
                country: arg.country,
                city: arg.city,
                state: arg.state,
            };

            patchUser(userId, { route: "/auth/profile/partner-preferences" }).finally();
            return await patchPartnerExpectation(userId, payload);
        },
        {
            onError: (error: Error) =>
                showError({ message: error.message || t("Failed to update partner preferences") }),
            onSuccess: () => {},
            revalidate: false,
        }
    );

    const onSubmit = async (values: PartnerFormValues) => {
        const isValid = await trigger();
        if (!isValid) return;

        await mutate(values);
        updateUserTrackingId({ step6: true });
        router.push("/membership");
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
