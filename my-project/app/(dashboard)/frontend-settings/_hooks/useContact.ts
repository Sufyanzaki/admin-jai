'use client';

import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getContactPageSettings } from "../_api/contactApi";
import { ContactSettingDto } from "../_types/contactTypes";

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
