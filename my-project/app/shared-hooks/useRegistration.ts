'use client';

import { useSWRFix } from "@/shared-lib";
import {RegistrationSettingDto} from "@/app/shared-types/registerationTypes";
import {getRegistrationPageSettings} from "@/app/shared-api/registerationApi";

export const useRegistration = () => {
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
