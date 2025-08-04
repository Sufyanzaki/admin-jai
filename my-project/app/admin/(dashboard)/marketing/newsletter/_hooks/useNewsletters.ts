import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getAllNewsletter, Newsletter } from "../_api/getAllNewsletter";

export default function useNewsletters() {
  const { data, error, loading, mutate } = useSWRFix<Newsletter[]>({
    key: "newsletters",
    fetcher: getAllNewsletter,
  });
  return {
    data,
    error,
    isLoading: loading,
    mutate,
  };
} 