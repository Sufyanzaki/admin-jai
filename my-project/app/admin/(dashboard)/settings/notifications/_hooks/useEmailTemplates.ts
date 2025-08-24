import {useSWRFix} from "@/shared-lib";
import {getEmailTemplates} from "../_api/emailTemplateApi";
import {EmailTemplateResponse} from "../_types/emailTemplateTypes";

export function useEmailTemplates() {
  const { data, loading, error, mutate } = useSWRFix<EmailTemplateResponse>({
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