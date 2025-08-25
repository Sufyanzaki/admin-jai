"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError, showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import { useBasicInfo } from "@/app/shared-hooks/useBasicInfo";
import { patchEducationCareer } from "@/app/shared-api/educationCareerApi";
import { patchLanguageInfo } from "@/app/shared-api/languageInfoApi";
import { useTranslation } from "react-i18next";


export default function useMoreInfoForm() {
    const { t } = useTranslation();
    const { data: session } = useSession();
    const userId = session?.user?.id ? String(session.user.id) : undefined;

    const moreInfoSchema = z.object({
        motherTongue: z.string().min(1, t("Mother tongue is required")),
        knownLanguages: z.array(z.string()).min(1, t("Select at least one language")),
        education: z.string().min(1, t("Education is required")),
        department: z.string().min(1, t("Department is required")),
        primarySpecialization: z.string().min(1, t("Primary specialization is required")),
    });

    type MoreInfoForm = z.infer<typeof moreInfoSchema>;

    const { user, userLoading } = useBasicInfo(userId);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
    } = useForm<MoreInfoForm>({
        resolver: zodResolver(moreInfoSchema),
        defaultValues: {
            motherTongue: "",
            knownLanguages: [],
            education: "",
            department: "",
            primarySpecialization: "",
        },
        mode: "onBlur",
    });

    useEffect(() => {
        if (!user) return;

        reset({
            primarySpecialization: user.educationCareer?.primarySpecialization || "",
            department: user.educationCareer?.department || "",
            education: user.educationCareer?.education || "",
            motherTongue: user.language?.motherTongue || "",
            knownLanguages: user.language?.knownLanguages ? user.language.knownLanguages.split(",") : [],
        });
    }, [user, reset]);



    const { trigger, isMutating } = useSWRMutation(
        "updateMoreInfo",
        async (_, { arg }: { arg: MoreInfoForm }) => {
            if (!userId) throw new Error("User ID is undefined. Please log in again");

            const { knownLanguages, motherTongue, education, department, primarySpecialization } = arg;
            const lang = knownLanguages.join(",");
            await patchEducationCareer(userId, { education, department, primarySpecialization });
            await patchLanguageInfo(userId, { knownLanguages: lang, motherTongue });
            return true
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message || "Failed to update" });
                console.error("Update More Info error:", error);
            },
            onSuccess: () => {
                showSuccess(t("More information updated successfully!"));
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (values: MoreInfoForm, callback?: () => void) => {
        try {
            const result = await trigger(values);
            if (result) {
                showSuccess(t("More information updated successfully!"));
                callback?.();
            }
        } catch (error: unknown) {
            // @ts-expect-error unknown type
            showError({ message: t(error.message) });
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
