import { useSWRFix } from "@/shared-lib";
import {FaqDto} from "@/app/shared-types/faq";
import {getAllFaq} from "@/app/shared-api/faqApi";

export default function useFaq() {
  const { data, error, loading, mutate } = useSWRFix<FaqDto[]>({
    key: "faqs",
    fetcher: getAllFaq,
  });
  return {
    data,
    error,
    isLoading: loading,
    mutate,
  };
}
