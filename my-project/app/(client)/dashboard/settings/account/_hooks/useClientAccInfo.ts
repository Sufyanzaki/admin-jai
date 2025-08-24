"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError, showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { patchUser } from "@/app/shared-api/userApi";
import { useSession } from "next-auth/react";
import { useBasicInfo } from "@/app/shared-hooks/useBasicInfo";
import { useTranslation } from "react-i18next";



export default function useClientAccInfo() {
    const { t } = useTranslation();
    const { data: session } = useSession();
    const userId = session?.user?.id ? String(session.user.id) : undefined;

    const clientAccInfoSchema = z.object({
        origin: z.string().min(1, t("Origin is required")),
        gender: z.string().min(1, t("Gender is required")),
        dob: z.string().min(1, t("Date of birth is required")),
        age: z.number().min(1, t("Age is required")),
        relationshipStatus: z.string().min(1, t("Relationship status is required")),
        lookingFor: z.string().min(1, t("Looking for is required")),
        children: z.string().optional(),
    });

    type ClientAccInfoForm = z.infer<typeof clientAccInfoSchema>;

    const { user, userLoading } = useBasicInfo(userId);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control
    } = useForm<ClientAccInfoForm>({
        resolver: zodResolver(clientAccInfoSchema),
        defaultValues: {
            origin: "",
            gender: "",
            dob: "",
            age: 0,
            relationshipStatus: "",
            lookingFor: "",
            children: "",
        },
        mode: "onBlur",
    });

    useEffect(() => {
        if (!user) return;
        const { origin, gender, dob, age, relationshipStatus, partnerExpectation } = user;
        reset({
            origin,
            gender,
            dob: dob ? dob.split("T")[0] : "",
            age,
            relationshipStatus,
            lookingFor: partnerExpectation?.lookingFor,
            children: ""
        });
    }, [user, reset]);

    const { trigger, isMutating } = useSWRMutation(
        "updateClientAccInfo",
        async (_, { arg }: { arg: ClientAccInfoForm }) => {
            const { children, ...other } = arg;
            if (!userId) throw new Error("User ID is undefined. Please log in again");
            return await patchUser(userId, other);
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message || "Failed to update" });
                console.error(t("Update Client Account Info error:"), error);
            },
            onSuccess: () => {
                showSuccess(t("Account info updated successfully!"));
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (values: ClientAccInfoForm, callback?: () => void) => {
        try {
            const result = await trigger(values);
            if (result) {
                showSuccess(t("Account info updated successfully!"));
                callback?.();
            }
        } catch (error: unknown) {
            if (error instanceof Error) showError({ message: error.message });
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        control,
        errors,
        isLoading: isSubmitting || isMutating,
        isFetching: userLoading,
    };
}
