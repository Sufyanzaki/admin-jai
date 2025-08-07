import { getRequest, patchRequest } from "@/shared-lib";
import { TermsSettingsDto } from "../_types/tosTypes";

type Payload = Partial<TermsSettingsDto>;

export async function getTermsConditionsSettings(): Promise<TermsSettingsDto | undefined> {
  return await getRequest<TermsSettingsDto>({ url: 'setting/terms-conditions' });
}

export async function patchTermsConditionsSettings(data: Payload): Promise<TermsSettingsDto> {
    const r = await patchRequest<Payload>({ url: 'setting/terms-conditions', data });
  return r.response;
}