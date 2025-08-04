'use client';

import { useSWRFix } from "@/shared-lib";
import { getTermsConditionsSettings } from "../_api/tosApi";
import { TermsSettingsDto } from "../_types/tosTypes";

export const useTOS = () => {
  const { data, loading, error, mutate } = useSWRFix<TermsSettingsDto>({
    key: 'terms-conditions-settings',
    fetcher: async () => {
      const response = await getTermsConditionsSettings();
      if (!response) throw new Error('Failed to fetch terms and conditions settings');
      return response;
    }
  });

  return {
    tosSettings: data,
    tosLoading: loading,
    error,
    mutate
  };
};
