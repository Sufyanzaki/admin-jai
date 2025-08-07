import { useSWRFix } from "@/shared-lib";
import { getEmailTemplateById } from "../_api/emailTemplateApi";
import {EmailTemplateDto} from "@/app/admin/(dashboard)/settings/notifications/_types/emailTemplateTypes";

export function useEmailTemplateById(id: string | undefined) {
  const { data, loading, error, mutate } = useSWRFix<EmailTemplateDto>({
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