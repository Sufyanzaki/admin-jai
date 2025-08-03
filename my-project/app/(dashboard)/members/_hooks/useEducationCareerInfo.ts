import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getEducationCareer } from "../_api/updateEducationCareer";
import { getUserTrackingId } from "@/lib/access-token";
import { useParams } from "next/navigation";

export const useEducationCareerInfo = () => {

  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const allowThisTab = tracker?.educationAndCareer;
  const userId = allowThisTab ? (tracker?.id ?? id) : null;

  const { data, loading, error, mutate } = useSWRFix({
    key: userId ? `education-career-${userId}` : '',
    fetcher: async () => {
      if (!userId) return null;
      return await getEducationCareer(userId);
    }
  });

  return {
    educationCareer: data,
    educationCareerLoading: loading,
    error,
    mutate
  };
}; 