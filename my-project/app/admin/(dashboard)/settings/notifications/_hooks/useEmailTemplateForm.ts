import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { useEmailTemplateById } from "./useEmailTemplateById";
import { useEffect, useMemo } from "react";
import { patchEmailTemplate } from "@/app/admin/(dashboard)/settings/notifications/_api/emailTemplateApi";
import { BasicLanguageDto } from "@/app/shared-types/basic-languages";
import { useTranslation } from "react-i18next";


type Props = {
  id: string;
  languages?: BasicLanguageDto[];
};

export default function useEmailTemplateForm({ id, languages = [] }: Props) {
  const { t } = useTranslation();

  const translationSchema = z.object({
    language: z.string().min(1, t("Language is required")),
    subject: z.string().min(1, t("Subject is required")),
    content: z.string().min(1, t("Content is required")),
  });

  const emailTemplateSchema = z.object({
    key: z.string().min(1, t("Key is required")),
    isActive: z.boolean(),
    translations: z.array(translationSchema).min(1, t("At least one translation is required")),
  });

  type EmailTemplateFormValues = z.infer<typeof emailTemplateSchema>;

  const { emailTemplate, loading, error } = useEmailTemplateById(id);

  const { trigger, isMutating } = useSWRMutation(
    `patch-email-template-${id}`,
    async (_: string, { arg }: { arg: EmailTemplateFormValues }) => {
      return await patchEmailTemplate(id, arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message });
        console.error(t("Email template update error:"), error);
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const initialTranslations = useMemo(() => {
    return languages.map((lang) => ({
      language: lang.code,
      subject: " ",
      content: " ",
    }));
  }, [languages]);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
    watch,
    control,
  } = useForm<EmailTemplateFormValues>({
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: {
      key: "",
      isActive: true,
      translations: initialTranslations,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (emailTemplate && languages.length > 0) {
      reset({
        key: emailTemplate.key,
        isActive: emailTemplate.isActive,
        translations: languages.map((lang) => {
          const t = emailTemplate.translations.find((tr) => tr.language === lang.name);
          return {
            language: lang.name,
            subject: t?.subject ?? " ",
            content: t?.content ?? " ",
          };
        }),
      });
    }
  }, [emailTemplate, languages, reset]);

  const onSubmit = async (values: EmailTemplateFormValues, callback?: () => void) => {
    const result = await trigger(values);
    if (result) {
      showSuccess(t("Email template updated successfully!"));
      callback?.();
    }
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    register,
    setValue,
    watch,
    control,
    reset,
    emailTemplate,
    loading,
    error,
  };
}
