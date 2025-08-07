import { getRequest, patchRequest } from "@/shared-lib";
import { HowItWorksSettingsDto } from "../_types/howWorks";

type Payload = Partial<HowItWorksSettingsDto>;

export async function getHowWorkSettings(): Promise<HowItWorksSettingsDto | undefined> {
  return await getRequest<HowItWorksSettingsDto>({ url: 'setting/how-it-works' });
}

export async function patchHowWorkSettings(data: Payload): Promise<HowItWorksSettingsDto> {
  const r = await patchRequest<Partial<HowItWorksSettingsDto>>({ url: 'setting/how-it-works', data });
  return r.response;
}