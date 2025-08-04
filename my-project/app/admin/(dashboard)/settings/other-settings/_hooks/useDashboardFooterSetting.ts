"use client";

import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getUserDashboardFooterSettings, UserDashboardFooterApiResponse } from "../_api/userDashboardFooterApi";

export function useDashboardFooterSetting() {
  const {
    data,
    error,
    loading,
    mutate,
    refetch
  } = useSWRFix<UserDashboardFooterApiResponse>({
    key: "user-dashboard-footer-settings",
    fetcher: async () => {
      const response = await getUserDashboardFooterSettings();
      return response;
    },
    config: {
      revalidateOnReconnect: false,
    }
  });

  return {
    data: data?.data, // Extract the nested data object
    error,
    isLoading: loading,
    mutate,
    refetch,
  };
}