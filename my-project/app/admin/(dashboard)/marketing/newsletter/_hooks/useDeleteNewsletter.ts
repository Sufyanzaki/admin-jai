import { useSWRConfig } from "swr";
import { deleteNewsletter } from "../_api/deleteNewsletter";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { useState } from "react";

export default function useDeleteNewsletter() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteNewsletterById = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await deleteNewsletter(id);
      if (result?.status === 200 || result?.status === 204) {
        showSuccess("Newsletter deleted successfully!");
        mutate(
          "newsletters",
          (current: any[] = []) => current.filter((item) => item.id !== id),
          false
        );
      } else {
        throw new Error("Failed to delete newsletter");
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete newsletter");
      showError({ message: err.message || "Failed to delete newsletter" });
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