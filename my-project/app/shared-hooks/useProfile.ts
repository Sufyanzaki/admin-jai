"use client"

import { useSWRFix } from "@/shared-lib";
import { getProfile } from "@/app/admin/(dashboard)/profile/_api/getProfile";
import { ProfileResponse } from "@/app/shared-types/auth";

export const useProfile = () => {
  
  const { data, loading, error, mutate } = useSWRFix<ProfileResponse | undefined>({
    key: 'user-profile',
    fetcher: async () => {
      const response = await getProfile();
      if (!response) throw new Error('Failed to fetch profile');
      return response;
    }
  });

  return {
    response: data,
    userLoading: loading,
    error,
    mutate
  };
};
