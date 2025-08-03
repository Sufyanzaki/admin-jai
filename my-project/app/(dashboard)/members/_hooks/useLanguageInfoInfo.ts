import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getUserTrackingId } from "@/lib/access-token";
import { getLanguageInfo } from "../_api/updateLanguageInfo";
import { useParams } from "next/navigation";

export const useLanguageInfoInfo = () => {
  
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const allowThisTab = tracker?.languages;
  const userId = allowThisTab ? (tracker?.id ?? id) : null;

  const { data, loading, error, mutate } = useSWRFix({
    key: userId ? `language-info-${userId}` : '',
    fetcher: async () => {
      if (!userId) return null;
      return await getLanguageInfo(userId);
    }
  });

  return {
    languageInfo: data,
    languageInfoLoading: loading,
    error,
    mutate
  };
}; 