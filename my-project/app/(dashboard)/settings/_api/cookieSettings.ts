import {getRequest, patchRequest} from "@/admin-utils";

export interface PostCookieSettingsPayload {
  cookieText: string;
  showAgreement: boolean;
}

export interface CookieResponse {
  id: number;
  siteKey: string | null;
  showAgreement: boolean;
  cookieText: string;
  createdAt: string;
  updatedAt: string;
}


export async function patchCookieSettings(payload: PostCookieSettingsPayload) {
  return patchRequest<PostCookieSettingsPayload>({
    url: "setting/cookie-settings",
    data: payload,
    useAuth: true,
  });
}

export async function getCookieSettings(): Promise<CookieResponse> {
  return getRequest({ url: "setting/cookie-settings", useAuth: true });
}