import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getEmailTemplateById } from "../_api/getEmailTemplateById";
import type { EmailTemplate } from "../_types/emailTemplateTypes";

export function useEmailTemplateById(id: number | string | undefined) {
  const { data, loading, error, mutate } = useSWRFix<EmailTemplate>({
    key: id ? `email-template-${id}` : '',
    fetcher: () => id ? getEmailTemplateById(id) : Promise.reject("No ID provided"),
  });
  return {
    emailTemplate: data,
    loading,
    error,
    mutate,
  };
} 