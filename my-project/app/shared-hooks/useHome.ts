'use client';

import { useSWRFix } from "@/shared-lib";
import { getHomePageSettings } from "@/app/shared-api/homeApi";
import { HomePageSettingsDto } from "@/app/shared-types/homeTypes";
import { useTranslation } from "react-i18next";

export const useHome = () => {
  const { t } = useTranslation();

  const { data, loading, error, mutate } = useSWRFix<HomePageSettingsDto>({
    key: "home-page-settings",
    fetcher: async () => {
      const response = await getHomePageSettings();
      if (!response) throw new Error(t("Failed to fetch home page settings"));
      return response;
    },
  });

  return {
    homeSettings: data,
    homeLoading: loading,
    error,
    mutate,
  };
};
