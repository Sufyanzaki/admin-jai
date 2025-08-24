"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { showError, showSuccess } from "@/shared-lib";
import { useEffect } from "react";
import { usePartnerExpectations } from "@/app/admin/(dashboard)/members/_hooks/usepartnerExpectations";
import { patchPartnerExpectation } from "@/app/shared-api/partnerExpectationApi";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

export const useClientExpectationsForm = () => {
    const { t } = useTranslation();

    const expectationsSchema = z.object({
        origin: z.string().min(1, t("Origin is required")),
        lookingFor: z.string().min(1, t("Looking for is required")),
        ageFrom: z
            .number({ invalid_type_error: t("Age from must be a number") })
            .min(18, t("Min age is 18"))
            .max(100, t("Max age is 100")),
        ageTo: z
            .number({ invalid_type_error: t("Age to must be a number") })
            .min(18, t("Min age is 18"))
            .max(100, t("Max age is 100")),
        country: z.string().min(1, t("Country is required")),
        city: z.string().optional(),
        state: z.string().min(1, t("State is required")),
        relationshipStatus: z.string().min(1, t("Relationship status is required")),
        education: z.string().min(1, t("Education is required")),
        religion: z.string().min(1, t("Religion is required")),
        smoke: z.string().min(1, t("Required")),
        drinking: z.string().min(1, t("Required")),
        weight: z.string().min(1, t("Weight is required")),
        goingOut: z.string().min(1, t("Required")),
        length: z.string().min(1, t("Length is required")),
    });

    type ExpectationsFormValues = z.infer<typeof expectationsSchema>;

    const { data: session } = useSession();
    const userId = session?.user?.id ? String(session.user.id) : undefined;

    const { expectations, expectationLoading } = usePartnerExpectations(userId);

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isDirty },
        reset,
        setValue,
        getValues,
    } = useForm<ExpectationsFormValues>({
        resolver: zodResolver(expectationsSchema),
        defaultValues: {
            origin: "",
            lookingFor: "",
            ageFrom: 25,
            ageTo: 35,
            country: "",
            city: "",
            state: "",
            relationshipStatus: "",
            education: "",
            religion: "",
            smoke: "",
            drinking: "",
            weight: "",
            goingOut: "",
            length: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (!expectations) return;
        const { id, userId, ...other } = expectations;

        reset({
            ...other,
            smoke: other.smoke ?? "",
            drinking: other.drinking ?? "",
            goingOut: other.goingOut ?? "",
            weight: other.weight ?? "",
            length: other.length ?? "",
            country: other.country ?? "",
            city: other.city ?? "",
            state: other.state ?? "",
        });

        console.warn(id, userId);
    }, [expectations, reset]);

    const { trigger, isMutating } = useSWRMutation(
        "updatePartnerExpectations",
        async (_, { arg }: { arg: ExpectationsFormValues }) => {
            if (!userId) throw new Error(t("User is missing"));
            return await patchPartnerExpectation(userId, arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message || t("Failed to update expectations") });
                console.error("Expectations update error:", error);
            },
            onSuccess: () => {
                showSuccess(t("Expectations updated successfully!"));
            },
        }
    );

    const onSubmit = async (values: ExpectationsFormValues, callback?: () => void) => {
        const result = await trigger(values);
        if (result) {
            callback?.();
        }
    };

    const setAgeRange = (range: [number, number]) => {
        setValue("ageFrom", range[0], { shouldValidate: true, shouldDirty: true });
        setValue("ageTo", range[1], { shouldValidate: true, shouldDirty: true });
    };

    return {
        control,
        register,
        handleSubmit,
        watch,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        isDirty,
        reset,
        getValues,
        setValue,
        isFetching: expectationLoading,
        ageRange: [watch("ageFrom"), watch("ageTo")] as [number, number],
        setAgeRange,
    };
};
