'use client';

import { useSWRFix } from "@/shared-lib";
import { AgendaSettingsDto } from "@/app/shared-types/agenda";
import { getAgendaSettings } from "@/app/shared-api/agendaApi";
import { useTranslation } from "react-i18next";

export const useAgenda = () => {
  const { t } = useTranslation();

  const { data, loading, error, mutate } = useSWRFix<AgendaSettingsDto>({
    key: "agenda-settings",
    fetcher: async () => {
      const response = await getAgendaSettings();
      if (!response) throw new Error(t("Failed to fetch agenda settings"));
      return response;
    },
  });

  return {
    agendaSettings: data,
    agendaLoading: loading,
    error: error ? t(error.message) : null,
    mutate,
  };
};
