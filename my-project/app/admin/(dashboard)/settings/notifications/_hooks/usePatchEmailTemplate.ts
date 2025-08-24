import { useState } from "react";
import { patchEmailTemplate, PatchEmailTemplatePayload } from "../_api/emailTemplateApi";
import { mutate as globalMutate } from "swr";
import { useTranslation } from "react-i18next";
import { EmailTemplateDto } from "../_types/emailTemplateTypes";

export function usePatchEmailTemplate() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const mutate = async (id: number | string, payload: PatchEmailTemplatePayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await patchEmailTemplate(id, payload);
      setSuccess(true);
      globalMutate("email-templates");
      globalMutate(`email-template-${id}`);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message || t("Failed to update template"));
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error, success };
} 