"use client";

import {useSWRFix} from "@/shared-lib";
import { getUserDashboardFooterSettings } from "../_api/userDashboardFooterApi";
import {DashboardFooterResponse} from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";

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
    data,
    error,
    isLoading: loading,
    mutate,
    refetch,
  };
}