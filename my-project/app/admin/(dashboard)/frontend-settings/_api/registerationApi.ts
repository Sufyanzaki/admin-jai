import { getRequest, patchRequest } from "@/admin-utils";
import { RegistrationSettingDto } from "../_types/registerationTypes";

export async function getRegistrationPageSettings(): Promise<RegistrationSettingDto | undefined> {
  return await getRequest<RegistrationSettingDto>({ url: 'setting/registration-page' });
}

export async function patchRegistrationPageSettings(data: Partial<RegistrationSettingDto>): Promise<any> {
    const r = await patchRequest<Partial<RegistrationSettingDto>>({ url: 'setting/registration-page', data });
  return r.response;
}