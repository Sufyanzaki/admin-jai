import { useState } from "react";
import { mutate as globalMutate } from "swr";
import { patchLanguageStatus } from "@/app/admin/(dashboard)/settings/_api/languageApi";
import { BasicLanguageDto } from "@/app/shared-types/basic-languages";
import { useTranslation } from "react-i18next";

export function usePatchLanguageStatus() {
  const { t } = useTranslation();
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
        (current: BasicLanguageDto[] = []) =>
          current.map(lang =>
            lang.id === id
              ? { ...lang, isActive }
              : lang
          ),
        false
      ).finally();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message || t("Failed to update status"));
    } finally {
      setLoading(false);
      setPatchingId(null);
    }
  };

  return { mutate, loading, error, patchingId };
}