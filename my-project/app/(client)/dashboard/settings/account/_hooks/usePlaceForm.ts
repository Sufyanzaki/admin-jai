"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useSWRMutation from "swr/mutation";
import { showError, showSuccess } from "@/shared-lib";
import { updateUserTrackingId } from "@/lib/access-token";
import { useLiving } from "@/app/admin/(dashboard)/members/_hooks/useLiving";
import { patchUserLocation, postUserLocation } from "@/app/shared-api/livingApi";
import { useTranslation } from "react-i18next";


export default function usePlaceForm() {
    const { t } = useTranslation();
    const { data: session } = useSession();
    const userId = session?.user?.id ? String(session.user.id) : undefined;

    const placeSchema = z.object({
        city: z.string().optional(),
        state: z.string().min(1, t("State is required")),
        country: z.string().min(1, t("Country is required")),
    });

    type PlaceFormValues = z.infer<typeof placeSchema>;

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
        setValue,
        watch,
    } = useForm<PlaceFormValues>({
        resolver: zodResolver(placeSchema),
        defaultValues: {
            city: "",
            state: "",
            country: "",
        },
        mode: "onBlur",
    });

    const { living, livingLoading } = useLiving(userId);

    useEffect(() => {
        if (!living) return

        const { city, state, country } = living;

        reset({
            city: city || "",
            state: state || "",
            country: country || "",
        });
    }, [living, reset]);

    const { trigger, isMutating } = useSWRMutation(
        "updatePlace",
        async (_: string, { arg }: { arg: PlaceFormValues }) => {
            if (!userId) {
                return showError({
                    message:
                        t("You need to initialize a new member profile before you can add other details. Go back to Basic Information to initialize a member."),
                });
            }
            if (!living) await postUserLocation(userId, arg);
            else await patchUserLocation(userId, arg);
            return true;
        },
        {
            onError: (error: Error) => {
                showError({
                    message: error.message || t("Failed to update place info"),
                });
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (values: PlaceFormValues, callback?: () => void) => {
        const result = await trigger(values);
        if (result) {
            showSuccess(t("Place updated successfully!"));
            callback?.();
            updateUserTrackingId({ place: true });
        }
    };

    return {
        handleSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        setValue,
        control,
        watch,
        onSubmit,
        isFetching: livingLoading,
    };
}
