'use client';

import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getHomePageSettings } from "../_api/homeApi";
import { HomePageSettingsDto } from "../_types/homeTypes";

export const useHome = () => {
  const { data, loading, error, mutate } = useSWRFix<HomePageSettingsDto>({
    key: 'home-page-settings',
    fetcher: async () => {
      const response = await getHomePageSettings();
      if (!response) throw new Error('Failed to fetch home page settings');
      return response;
    }
  });

  return {
    homeSettings: data,
    homeLoading: loading,
    error,
    mutate
  };
};
