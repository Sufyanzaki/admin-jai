import { getRequest, patchRequest } from "@/admin-utils";
import { AgendaSettingsDto } from "../_types/agenda";

export async function getAgendaSettings(): Promise<AgendaSettingsDto | undefined> {
  return await getRequest<AgendaSettingsDto>({ url: 'setting/agenda' });
}

export async function patchAgendaSettings(data: Partial<AgendaSettingsDto>): Promise<any> {
  const r = await patchRequest<Partial<AgendaSettingsDto>>({ url: 'setting/agenda', data });
  return r.response;
}