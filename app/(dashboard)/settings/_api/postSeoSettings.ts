import { postRequest } from "@/admin-utils";

export interface PostSeoSettingsPayload {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  metaImage: string | null;
}

export async function postSeoSettings(payload: PostSeoSettingsPayload) {
  return postRequest<PostSeoSettingsPayload>({
    url: "seo-settings",
    data: payload,
    useAuth: true,
  });
} 