import { getRequest, patchRequest } from "@/shared-lib";
import {HomePageSettingsDto} from "@/app/admin/(dashboard)/frontend-settings/_types/homeTypes";

type Payload = Partial<HomePageSettingsDto>

export async function getHomePageSettings(): Promise<HomePageSettingsDto | undefined> {
  return await getRequest<HomePageSettingsDto>({ url: 'setting/homePage' });
}

export async function patchHomePageSettings(data: Payload): Promise<HomePageSettingsDto> {
  const r = await patchRequest<Payload>({ url: 'setting/homePage', data });
  return r.response;
}