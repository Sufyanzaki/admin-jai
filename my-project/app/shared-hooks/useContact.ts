'use client';

import { useSWRFix } from "@/shared-lib";
import { ContactSettingDto } from "@/app/shared-types/contactTypes";
import { getContactPageSettings } from "@/app/shared-api/contactApi";
import { useTranslation } from "react-i18next";

export const useContact = () => {
  const { t } = useTranslation();

  const { data, loading, error, mutate } = useSWRFix<ContactSettingDto>({
    key: "contact-page-settings",
    fetcher: async () => {
      const response = await getContactPageSettings();
      if (!response) throw new Error(t("Failed to fetch contact page settings"));
      return response;
    },
  });

  return {
    contactSettings: data,
    contactLoading: loading,
    error: error ? t(error.message) : null,
    mutate,
  };
};
