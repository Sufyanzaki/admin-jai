'use client';

import { useSWRFix } from "@/shared-lib";
import {AgendaSettingsDto} from "@/app/shared-types/agenda";
import {getAgendaSettings} from "@/app/shared-api/agendaApi";

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
