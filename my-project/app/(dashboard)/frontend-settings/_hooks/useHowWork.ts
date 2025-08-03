'use client';

import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getHowWorkSettings } from "../_api/howWorkApi";
import { HowItWorksSettingsDto } from "../_types/howWorks";

export const useHowWork = () => {
  const { data, loading, error, mutate } = useSWRFix<HowItWorksSettingsDto>({
    key: 'how-work-settings',
    fetcher: async () => {
      const response = await getHowWorkSettings();
      if (!response) throw new Error('Failed to fetch how it works settings');
      return response;
    }
  });

  return {
    howWorkSettings: data,
    howWorkLoading: loading,
    error,
    mutate
  };
};
