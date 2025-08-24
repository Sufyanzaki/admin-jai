import { useSWRFix } from "@/shared-lib";
import { getEmailTemplateById } from "../_api/emailTemplateApi";
import { EmailTemplateDto } from "@/app/admin/(dashboard)/settings/notifications/_types/emailTemplateTypes";
import { useTranslation } from "react-i18next";

export function useEmailTemplateById(id: string | undefined) {
  const { t } = useTranslation();
  const { data, loading, error, mutate } = useSWRFix<EmailTemplateDto>({
    key: id ? `email-template-${id}` : '',
    fetcher: () => id ? getEmailTemplateById(id) : Promise.reject(t("No ID provided")),
  });
  return {
    emailTemplate: data,
    loading,
    error,
    mutate,
  };
} 