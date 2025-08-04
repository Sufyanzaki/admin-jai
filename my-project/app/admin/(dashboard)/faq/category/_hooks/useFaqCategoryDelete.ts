import { useSWRConfig } from "swr";
import { deleteFaqCategory } from "../_api/deleteFaqCategory";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { useState } from "react";

export default function useFaqCategoryDelete() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteCategory = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await deleteFaqCategory(id);
      if (result?.status === 200 || result?.status === 204) {
        showSuccess("FAQ Category deleted successfully!");
        mutate(
          "faq-categories",
          (current: any[] = []) => current.filter((cat) => cat.id !== id),
          false
        );
      } else {
        throw new Error("Failed to delete category");
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete category");
      showError({ message: err.message || "Failed to delete category" });
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
