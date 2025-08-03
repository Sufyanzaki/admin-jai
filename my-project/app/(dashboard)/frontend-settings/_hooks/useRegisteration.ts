'use client';

import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getRegistrationPageSettings } from "../_api/registerationApi";
import { RegistrationSettingDto } from "../_types/registerationTypes";

export const useRegisteration = () => {
  const { data, loading, error, mutate } = useSWRFix<RegistrationSettingDto>({
    key: 'registration-page-settings',
    fetcher: async () => {
      const response = await getRegistrationPageSettings();
      if (!response) throw new Error('Failed to fetch registration page settings');
      return response;
    }
  });

  return {
    registrationSettings: data,
    loading,
    error,
    mutate
  };
};
