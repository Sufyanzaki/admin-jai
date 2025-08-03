"use client";

import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getFooterSettings, FooterResponse } from "../_api/footerApi";

export function useFooterSettings() {
  const {
    data,
    error,
    loading,
    mutate,
    refetch
  } = useSWRFix<FooterResponse>({
    key: "footer-settings",
    fetcher: async () => {
      const response = await getFooterSettings();
      return response;
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