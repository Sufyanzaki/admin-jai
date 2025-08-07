import { useSWRConfig } from "swr";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { useState } from "react";
import {deleteFaqCategory} from "@/app/shared-api/faqApi";
import {FaqCategoryDto} from "@/app/shared-types/faq";

export default function useFaqCategoryDelete() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteCategory = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await deleteFaqCategory(id);
      if (result?.status === 200 || result?.status === 204) {
        showSuccess("FAQ Category deleted successfully!");
        mutate(
          "faq-categories",
          (current: FaqCategoryDto[] = []) => current.filter((cat) => cat.id !== id),
          false
        ).finally();
      } else {
        throw new Error("Failed to delete category");
      }
    } catch (err: unknown) {
      if(err instanceof Error) {
        setError(err.message || "Failed to delete category");
        showError({ message: err.message || "Failed to delete category" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteCategory,
    isLoading,
    error,
  };
}
