import { useSWRFix } from "@/shared-lib";
import {getFaqCategories} from "@/app/shared-api/faqApi";
import {FaqCategoryDto} from "@/app/shared-types/faq";

export default function useFaqCategories() {
  const { data, error, loading, mutate } = useSWRFix<FaqCategoryDto[]>({
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
