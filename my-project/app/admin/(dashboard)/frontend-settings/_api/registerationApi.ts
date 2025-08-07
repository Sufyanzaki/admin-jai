import { getRequest, patchRequest } from "@/shared-lib";
import { RegistrationSettingDto } from "../_types/registerationTypes";

type Payload = Partial<RegistrationSettingDto>

export async function getRegistrationPageSettings(): Promise<RegistrationSettingDto | undefined> {
  return await getRequest<RegistrationSettingDto>({ url: 'setting/registration-page' });
}

export async function patchRegistrationPageSettings(data: Payload): Promise<RegistrationSettingDto> {
    const r = await patchRequest<Payload>({ url: 'setting/registration-page', data });
  return r.response;
}