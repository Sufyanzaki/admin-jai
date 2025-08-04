import { getRequest, patchRequest } from "@/admin-utils";
import { ContactSettingDto } from "../_types/contactTypes";

export async function getContactPageSettings(): Promise<ContactSettingDto | undefined> {
  return await getRequest<ContactSettingDto>({ url: 'setting/contact-page' });
}

export async function patchContactPageSettings(data: Partial<ContactSettingDto>): Promise<any> {
  const r = await patchRequest<Partial<ContactSettingDto>>({ url: 'setting/contact-page', data });
  return r.response;
}