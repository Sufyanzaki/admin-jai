"use client"

import { useSWRFix } from "@/shared-lib";
import { getProfile } from "@/app/admin/(dashboard)/profile/_api/getProfile";
import { ProfileResponse } from "@/app/shared-types/auth";
import {useSession} from "next-auth/react";

export const useProfile = () => {

  const { data:session } = useSession();

  const { data, loading, error, mutate } = useSWRFix<ProfileResponse | undefined>({
    key: session ? 'user-profile' : null,
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
