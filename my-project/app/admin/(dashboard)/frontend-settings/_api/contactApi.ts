import { getRequest, patchRequest } from "@/shared-lib";
import { ContactSettingDto } from "../_types/contactTypes";

export async function getContactPageSettings(): Promise<ContactSettingDto | undefined> {
  return await getRequest<ContactSettingDto>({ url: 'setting/contact-page' });
}

export async function patchContactPageSettings(data: Partial<ContactSettingDto>): Promise<ContactSettingDto> {
  const r = await patchRequest<Partial<ContactSettingDto>>({ url: 'setting/contact-page', data });
  return r.response;
}