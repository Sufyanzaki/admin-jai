import { useState } from "react";
import { patchLanguageStatus, PatchLanguageStatusPayload } from "@/app/(dashboard)/settings/_api/patchLanguageStatus";
import { mutate as globalMutate } from "swr";
import type { Language } from "@/app/(dashboard)/settings/_api/getLanguages";

export function usePatchLanguageStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patchingId, setPatchingId] = useState<string | null>(null);

  const mutate = async (id: string, isActive: boolean) => {
    setLoading(true);
    setPatchingId(id);
    setError(null);
    try {
      await patchLanguageStatus({ id, isActive });
      globalMutate(
        "languages-list",
        (current: Language[] = []) =>
          current.map(lang =>
            lang.id === id
              ? { ...lang, isActive }
              : lang
          ),
        false
      );
    } catch (err: any) {
      setError(err?.message || "Failed to update status");
    } finally {
      setLoading(false);
      setPatchingId(null);
    }
  };

  return { mutate, loading, error, patchingId };
}