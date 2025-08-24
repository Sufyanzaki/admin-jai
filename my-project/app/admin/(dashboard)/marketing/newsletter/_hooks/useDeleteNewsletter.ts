import { useSWRConfig } from "swr";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { useState } from "react";
import { deleteNewsletter } from "@/app/admin/(dashboard)/marketing/newsletter/_api/newsLetterApi";
import { NewsletterDto } from "@/app/shared-types/newsletter";
import { useTranslation } from "react-i18next";

export default function useDeleteNewsletter() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const deleteNewsletterById = async (id: string) => {

    setIsLoading(true);
    setError(null);
    try {
      const result = await deleteNewsletter(id);
      if (result) {
        showSuccess(t("Newsletter deleted successfully!"));
        mutate(
          "newsletters",
          (current: NewsletterDto[] = []) => current.filter((item) => String(item.id) !== String(id)),
          false
        ).finally();
      } else {
        throw new Error(t("Failed to delete newsletter"));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || t("Failed to delete newsletter"));
        showError({ message: err.message || t("Failed to delete newsletter") });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteNewsletterById,
    isLoading,
    error,
  };
} 