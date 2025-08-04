import { useSWRFix } from "@/shared-lib";
import { getProfileAttributes } from "../_api/getProfileAttributes";

export function useProfileAttributes() {
  const { data, loading, error, mutate } = useSWRFix({
    key: `profile-attributes`,
    fetcher: getProfileAttributes,
  });

  return {
    attributes: data,
    loading,
    error,
    mutate,
  };
} 