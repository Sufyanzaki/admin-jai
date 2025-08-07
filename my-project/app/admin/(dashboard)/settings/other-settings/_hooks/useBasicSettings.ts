import { useSWRFix } from "@/shared-lib";
import { getBasicSettings } from "../_api/basicSettingApi";

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