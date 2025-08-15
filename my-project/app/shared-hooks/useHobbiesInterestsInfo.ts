import { useSWRFix } from "@/shared-lib";
import { getUserTrackingId } from "@/lib/access-token";
import { getHobbiesInterests } from "@/app/shared-api/hobbiesInterestsApi";
import { useParams } from "next/navigation";

export const useHobbiesInterestsInfo = (userIdProps?:string) => {
  
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const allowThisTab = tracker?.hobbiesAndInterest || tracker?.step3;
  const userId = userIdProps ?? (allowThisTab ? (tracker?.id ?? id) : null);

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