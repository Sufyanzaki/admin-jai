import {getRequest, patchRequest} from "@/admin-utils";

export interface PostSeoSettingsPayload {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  metaImage?: string | null;
}

export async function patchSeoSettings(payload: PostSeoSettingsPayload) {
  return patchRequest<PostSeoSettingsPayload>({
    url: "setting/seo-settings",
    data: payload,
    useAuth: true,
  });
}

export async function getSeoSettings(): Promise<PostSeoSettingsPayload> {
  return getRequest<PostSeoSettingsPayload>({
    url: "setting/seo-settings",
    useAuth: true,
  });
}