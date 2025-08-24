"use client";

import { useSWRFix } from "@/shared-lib";
import { RegistrationSettingDto } from "@/app/shared-types/registerationTypes";
import { getRegistrationPageSettings } from "@/app/shared-api/registerationApi";
import { useTranslation } from "react-i18next";

export const useRegistration = () => {
  const { t } = useTranslation();

  const { data, loading, error, mutate } = useSWRFix<RegistrationSettingDto>({
    key: "registration-page-settings",
    fetcher: async () => {
      const response = await getRegistrationPageSettings();
      if (!response) {
        throw new Error(t("Failed to fetch registration page settings"));
      }
      return response;
    },
  });

  return {
    registrationSettings: data,
    registrationLoading: loading,
    error,
    mutate,
  };
};
