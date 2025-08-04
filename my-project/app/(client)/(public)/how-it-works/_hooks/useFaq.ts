import { useSWRFix } from "@/shared-lib";
import { getAllFaq, Faq } from "../_api/getFaq";

export default function useFaq() {
  const { data, error, loading, mutate } = useSWRFix<Faq[]>({
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
