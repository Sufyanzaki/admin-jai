"use client";

import { useSWRFix } from "@/shared-lib";
import { getProfile } from "@/app/admin/(dashboard)/profile/_api/getProfile";
import { ProfileResponse } from "@/app/shared-types/auth";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

export const useProfile = () => {
  const { data: session } = useSession();
  const { t } = useTranslation();

  const { data, loading, error, mutate } = useSWRFix<ProfileResponse | undefined>({
    key: session ? "user-profile" : null,
    fetcher: async () => {
      const response = await getProfile();
      if (!response) throw new Error(t("Failed to fetch profile"));
      return response;
    },
  });

  return {
    response: data,
    userLoading: loading,
    error,
    mutate,
  };
};
