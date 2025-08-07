import { useSWRFix } from "@/shared-lib";
import { getEmailTemplates } from "../_api/emailTemplateApi";
import { EmailTemplateDto } from "../_types/emailTemplateTypes";

export function useEmailTemplates() {
  const { data, loading, error, mutate } = useSWRFix<EmailTemplateDto[]>({
    key: "email-templates",
    fetcher: getEmailTemplates,
  });
  return {
    emailTemplates: data,
    loading,
    error,
    mutate,
  };
} 