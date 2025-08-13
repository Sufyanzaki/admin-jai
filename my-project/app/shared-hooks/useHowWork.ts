'use client';

import { useSWRFix } from "@/shared-lib";
import {HowItWorksSettingsDto} from "@/app/shared-types/howWorks";
import {getHowWorkSettings} from "@/app/shared-api/howWorkApi";

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
