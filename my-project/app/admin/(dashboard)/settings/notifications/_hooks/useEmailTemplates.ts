import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getEmailTemplates } from "../_api/getEmailTemplates";
import type { EmailTemplate } from "../_types/emailTemplateTypes";

export function useEmailTemplates() {
  const { data, loading, error, mutate } = useSWRFix<EmailTemplate[]>({
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