import { useSWRFix } from "@/shared-lib";
import { getBasicSettings } from "../_api/getBasicSettings";

export function useBasicSettings() {
  const { data, error, loading, mutate } = useSWRFix({
    key: "getBasicSettings",
    fetcher: getBasicSettings,
  });
  return {
    data,
    error,
    loading,
    mutate,
  };
} 