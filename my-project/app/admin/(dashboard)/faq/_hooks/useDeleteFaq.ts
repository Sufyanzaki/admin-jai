import { useSWRConfig } from "swr";
import { deleteFaq } from "@/app/shared-api/faqApi";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {FaqDto} from "@/app/shared-types/faq";

export default function useDeleteFaq() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const deleteFaqById = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await deleteFaq(id);
      if (result) {
        showSuccess(t("FAQ deleted successfully!"));
        mutate(
          "faqs",
          (current: FaqDto[] = []) => current.filter((faq) => faq.id !== id),
          false
        ).finally();
      } else {
        throw new Error(t("Failed to delete FAQ"));
      }
    } catch (err: unknown) {
        if(err instanceof Error) {
          setError(t(err.message || "Failed to delete FAQ"));
          showError({ message: t(err.message || "Failed to delete FAQ") });
        }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteFaqById,
    isLoading,
    error,
  };
}

