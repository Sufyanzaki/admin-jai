import { getRequest, patchRequest } from "@/admin-utils";
import { TermsSettingsDto } from "../_types/tosTypes";

export async function getTermsConditionsSettings(): Promise<TermsSettingsDto | undefined> {
  return await getRequest<TermsSettingsDto>({ url: 'setting/terms-conditions' });
}

export async function patchTermsConditionsSettings(data: Partial<TermsSettingsDto>): Promise<any> {
    const r = await patchRequest<Partial<TermsSettingsDto>>({ url: 'setting/terms-conditions', data });
  return r.response;
}