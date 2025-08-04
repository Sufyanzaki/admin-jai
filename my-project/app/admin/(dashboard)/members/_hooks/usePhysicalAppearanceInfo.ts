import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getUserTrackingId } from "@/lib/access-token";
import { getPhysicalAppearance } from "../_api/updatePhysicalAppearance";
import { useParams } from "next/navigation";

export const usePhysicalAppearanceInfo = () => {
  
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const allowThisTab = tracker?.aboutMe;
  const userId = allowThisTab ? (tracker?.id ?? id) : null;

  const { data, loading, error, mutate } = useSWRFix({
    key: userId ? `physical-appearance-${userId}` : '',
    fetcher: async () => {
      if (!userId) return null;
      return await getPhysicalAppearance(userId);
    }
  });

  return {
    physicalAppearance: data,
    physicalAppearanceLoading: loading,
    error,
    mutate
  };
}; 