import { getRequest, patchRequest } from "@/admin-utils";
import {HomePageSettingsDto} from "@/app/(dashboard)/frontend-settings/_types/homeTypes";

export async function getHomePageSettings(): Promise<HomePageSettingsDto | undefined> {
  return await getRequest<HomePageSettingsDto>({ url: 'setting/homePage' });
}

export async function patchHomePageSettings(data: Partial<HomePageSettingsDto>): Promise<any> {
  const r = await patchRequest<Partial<HomePageSettingsDto>>({ url: 'setting/homePage', data });
  return r.response;
}