'use client';

import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getAgendaSettings } from "../_api/agendaApi";
import { AgendaSettingsDto } from "../_types/agenda";

export const useAgenda = () => {
  const { data, loading, error, mutate } = useSWRFix<AgendaSettingsDto>({
    key: 'agenda-settings',
    fetcher: async () => {
      const response = await getAgendaSettings();
      if (!response) throw new Error('Failed to fetch agenda settings');
      return response;
    }
  });

  return {
    agendaSettings: data,
    agendaLoading: loading,
    error,
    mutate
  };
};
