'use client';

import { useSWRFix } from "@/shared-lib";
import {ContactSettingDto} from "@/app/shared-types/contactTypes";
import {getContactPageSettings} from "@/app/shared-api/contactApi";

export const useContact = () => {
  const { data, loading, error, mutate } = useSWRFix<ContactSettingDto>({
    key: 'contact-page-settings',
    fetcher: async () => {
      const response = await getContactPageSettings();
      if (!response) throw new Error('Failed to fetch contact page settings');
      return response;
    }
  });

  return {
    contactSettings: data,
    contactLoading: loading,
    error,
    mutate
  };
};
