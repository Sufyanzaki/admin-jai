import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getFaqCategories, FaqCategory } from "../_api/getFaqCategories";

export default function useFaqCategories() {
  const { data, error, loading, mutate } = useSWRFix<FaqCategory[]>({
    key: "faq-categories",
    fetcher: getFaqCategories,
  });
  return {
    data,
    error,
    isLoading: loading,
    mutate,
  };
}
