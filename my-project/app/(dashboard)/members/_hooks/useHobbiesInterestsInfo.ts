import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getUserTrackingId } from "@/lib/access-token";
import { getHobbiesInterests } from "../_api/updateHobbiesInterests";
import { useParams } from "next/navigation";

export const useHobbiesInterestsInfo = () => {
  
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const allowThisTab = tracker?.hobbiesAndInterest;
  const userId = allowThisTab ? (tracker?.id ?? id) : null;

  const { data, loading, error, mutate } = useSWRFix({
    key: userId ? `hobbies-interests-${userId}` : '',
    fetcher: async () => {
      if (!userId) return null;
      return await getHobbiesInterests(userId);
    }
  });

  return {
    hobbiesInterests: data,
    hobbiesInterestsLoading: loading,
    error,
    mutate
  };
}; 