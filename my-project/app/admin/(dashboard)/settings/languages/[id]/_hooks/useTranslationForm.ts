import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWRMutation from "swr/mutation";
import { showError, showSuccess } from "@/shared-lib";
import { useTranslation } from "react-i18next";
import { postTranslation } from "@/app/admin/(dashboard)/settings/languages/[id]/_api/translationApi";
import { useParams } from "next/navigation";
import { useSWRConfig } from "swr";
import { LanguageTranslationsDto } from "@/app/admin/(dashboard)/settings/languages/[id]/_types/translation";



export default function useTranslationForm() {
    const { t } = useTranslation();
    const translationSchema = z.object({
        key: z.string().min(1, t("Key is required")),
        text: z.string().min(1, t("Value is required")),
    });

    type TranslationFormValues = z.infer<typeof translationSchema>;
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? '';
    const { mutate: globalMutate } = useSWRConfig();

    const {
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        register,
    } = useForm<TranslationFormValues>({
        resolver: zodResolver(translationSchema),
        defaultValues: {
            key: "",
            text: "",
        },
        mode: "onBlur",
    });

    const { trigger, isMutating } = useSWRMutation(
        'translation-save',
        async (url: string, { arg }: { arg: TranslationFormValues }) => {
            return await postTranslation({ ...arg, languageCode: id });
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message });
                console.error('Translation save error:', error);
            },
            onSuccess: () => {
                showSuccess(t("Translation added successfully!"));
            }
        }
    );

    const onSubmit = async (values: TranslationFormValues, callback?: () => void) => {
        await trigger(values);
        await globalMutate(
            `translation-details-${id}`,
            (currentData: LanguageTranslationsDto | undefined) => {
                if (!currentData) return currentData;
                return {
                    ...currentData,
                    translations: {
                        ...currentData.translations,
                        translations: {
                            ...currentData.translations.translations,
                            [values.key]: values.text,
                        },
                    },
                };
            },
            false
        );
        reset();
        callback?.();
    };

    return {
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        register,
    };
}