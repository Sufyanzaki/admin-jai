import { getRequest, patchRequest } from "@/admin-utils";
import { HowItWorksSettingsDto } from "../_types/howWorks";

export async function getHowWorkSettings(): Promise<HowItWorksSettingsDto | undefined> {
  return await getRequest<HowItWorksSettingsDto>({ url: 'setting/how-it-works' });
}

export async function patchHowWorkSettings(data: Partial<HowItWorksSettingsDto>): Promise<any> {
  const r = await patchRequest<Partial<HowItWorksSettingsDto>>({ url: 'setting/how-it-works', data });
  return r.response;
}