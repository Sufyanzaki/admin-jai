"use client";

import {useSWRFix} from "@/shared-lib";
import {DashboardFooterResponse, getUserDashboardFooterSettings} from "../_api/userDashboardFooterApi";

export function useDashboardFooterSetting() {
  const {
    data,
    error,
    loading,
    mutate,
    refetch
  } = useSWRFix<DashboardFooterResponse>({
    key: "user-dashboard-footer-settings",
    fetcher: async () => {
      return await getUserDashboardFooterSettings();
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