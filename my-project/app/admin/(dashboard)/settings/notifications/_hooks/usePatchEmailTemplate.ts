import { useState } from "react";
import { patchEmailTemplate, PatchEmailTemplatePayload } from "../_api/patchEmailTemplate";
import { mutate as globalMutate } from "swr";

export function usePatchEmailTemplate() {
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
    } catch (err: any) {
      setError(err?.message || "Failed to update template");
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error, success };
} 