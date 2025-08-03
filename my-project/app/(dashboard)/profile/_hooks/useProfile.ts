"use client"

import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getProfile } from "@/app/(dashboard)/profile/_api/getProfile";
import { ProfileResponse } from "../_types/profile-types";

export const useProfile = () => {
  
  const { data, loading, error, mutate } = useSWRFix<ProfileResponse>({
    key: 'user-profile',
    fetcher: async () => {
      const response = await getProfile();
      if (!response) throw new Error('Failed to fetch profile');
      return response;
    }
  });

  return {
    user: data?.user,
    userLoading: loading,
    error,
    mutate
  };
};
