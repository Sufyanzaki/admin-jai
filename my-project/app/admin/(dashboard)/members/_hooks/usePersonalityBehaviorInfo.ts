import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getUserTrackingId } from "@/lib/access-token";
import { getPersonalityBehavior } from "../_api/updatePersonalityBehavior";
import { useParams } from "next/navigation";

export const usePersonalityBehaviorInfo = () => {
  
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const allowThisTab = tracker?.personalityAndBehavior;
  const userId = allowThisTab ? (tracker?.id ?? id) : null;

  const { data, loading, error, mutate } = useSWRFix({
    key: userId ? `personality-behavior-${userId}` : '',
    fetcher: async () => {
      if (!userId) return null;
      return await getPersonalityBehavior(userId);
    }
  });

  return {
    personalityBehavior: data,
    personalityBehaviorLoading: loading,
    error,
    mutate
  };
}; 