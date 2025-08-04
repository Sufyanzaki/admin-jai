'use client';

import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getUser } from "../add/_api/createUser";
import { getUserTrackingId } from "@/lib/access-token";
import { useParams } from "next/navigation";

export const useBasicInfo = () => {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const userId = tracker?.id ?? id;

  const { data, loading, error, mutate } = useSWRFix({
    key: userId ? `user-${userId}` : '',
    fetcher: async () => {
      if (!userId) return null;
      return await getUser(userId);
    },
  });

  return {
    user: data,
    userLoading: loading,
    error,
    mutate,
  };
};
