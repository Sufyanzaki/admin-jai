import { useSWRConfig } from "swr";
import { deleteFaq } from "../_api/deleteFaq";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { useState } from "react";

export default function useDeleteFaq() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteFaqById = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await deleteFaq(id);
      if (result?.status === 200 || result?.status === 204) {
        showSuccess("FAQ deleted successfully!");
        mutate(
          "faqs",
          (current: any[] = []) => current.filter((faq) => faq.id !== id),
          false
        );
      } else {
        throw new Error("Failed to delete FAQ");
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete FAQ");
      showError({ message: err.message || "Failed to delete FAQ" });
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
