import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getCurrencies, Currency } from "../_api/currencies";

export function useCurrencies() {
  const { data, loading, error, mutate } = useSWRFix<Currency[]>({
    key: "currencies",
    fetcher: getCurrencies,
  });
  return {
    currencies: data,
    loading,
    error,
    mutate,
  };
} 