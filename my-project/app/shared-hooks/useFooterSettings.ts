"use client";

import {useSWRFix} from "@/shared-lib";
import {getFooterSettings} from "@/app/shared-api/footerApi";
import {FooterSettingDto} from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";

export function useFooterSettings() {
  const {
    data,
    error,
    loading,
    mutate,
    refetch
  } = useSWRFix<FooterSettingDto>({
    key: "footer-settings",
    fetcher: async () => {
      return await getFooterSettings();
    },
    config: {
      revalidateOnReconnect: false,
    }
  });

  return {
    data,
    error,
    isLoading: loading,
    mutate,
    refetch,
  };
}