import { useSWRFix } from "@/shared-lib";
import { getProfileAttribute } from "@/app/shared-api/getProfileAttribute";

export function useProfileAttributeInfo(attributeId: string) {
  const { data, loading, error, mutate } = useSWRFix({
    key: attributeId ? `profile-attribute-${attributeId}` : '',
    fetcher: async () => {
      if (!attributeId) return null;
      return await getProfileAttribute(attributeId);
    }
  });

  return {
    attribute: data,
    loading,
    error,
    mutate,
  };
} 