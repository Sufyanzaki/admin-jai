import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { useEffect } from "react";
import { patchUser } from "@/app/shared-api/userApi";
import { useSession } from "next-auth/react";
import { MemberProfile } from "@/app/shared-types/member";
import { showError, showSuccess } from "@/shared-lib";
import { useProfile } from "@/app/shared-hooks/useProfile";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useLanguages } from "@/app/admin/(dashboard)/settings/_hooks/useLanguages";

export default function useActiveLanguage() {
    const { t } = useTranslation();
    const { data: session } = useSession();
    const userId = session?.user?.id ? String(session.user.id) : undefined;
    const { languages, languagesLoading } = useLanguages();

    const { response, userLoading, mutate } = useProfile();
    const user = response?.user;
    const activeLanguage = user?.activeLanguage ?? null; // full object now

    // schema only cares about id
    const activeLanguageSchema = z.object({
        activeLanguageId: z.number(),
    });
    type ActiveLanguageFormValues = z.infer<typeof activeLanguageSchema>;

    const { trigger } = useSWRMutation(
        "active-language",
        async (_: string, { arg }: { arg: Partial<MemberProfile> }) => {
            if (!userId) throw new Error(t("User ID is undefined. Please log in again"));
            return await patchUser(userId, arg);
        },
        {
            onError: (error: unknown) => {
                showError({
                    message: error instanceof Error ? error.message : t("An unknown error occurred."),
                });
            },
        }
    );

    const {
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        control,
    } = useForm<ActiveLanguageFormValues>({
        resolver: zodResolver(activeLanguageSchema),
        defaultValues: { activeLanguageId: user?.activeLanguageId ?? 0 },
        mode: "onBlur",
    });

    useEffect(() => {
        if (user?.activeLanguageId) {
            reset({ activeLanguageId: user.activeLanguageId });
            i18n.changeLanguage(user?.activeLanguage?.code); // update i18n as well
        }
    }, [user, reset]);

    const onSubmit = async (values: ActiveLanguageFormValues) => {
        try {
            await trigger({ activeLanguageId: values.activeLanguageId });
            const selected = languages?.find(l => Number(l.id) === values.activeLanguageId);
            if (selected) {
                console.log("Setting i18n to:", selected);
                i18n.changeLanguage(selected.code); 
            }
            mutate();
            showSuccess(t("Preferred Language Updated"));
        } catch (error: unknown) {
            if (error instanceof Error) showError({ message: error.message });
        }
    };

    return {
        handleSubmit,
        onSubmit,
        control,
        errors,
        isLoading: isSubmitting,
        isFetching: userLoading,
        activeLanguage,
    };
}
