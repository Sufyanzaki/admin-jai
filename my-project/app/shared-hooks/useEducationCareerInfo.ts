import { useSWRFix } from "@/shared-lib";
import { getEducationCareer } from "@/app/shared-api/educationCareerApi";
import { getUserTrackingId } from "@/lib/access-token";
import { useParams } from "next/navigation";

export const useEducationCareerInfo = () => {

  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const allowThisTab = (tracker?.educationAndCareer || tracker?.step2);
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