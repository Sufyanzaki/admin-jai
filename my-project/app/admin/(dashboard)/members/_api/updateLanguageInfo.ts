import { postRequest, patchRequest, getRequest } from "@/admin-utils";

export interface LanguageInfoPayload {
  motherTongue: string;
  knownLanguages: string;
}

export async function postLanguageInfo(userId: string, payload: LanguageInfoPayload) {
  return postRequest({
    url: `users/${userId}/language-info`,
    data: payload,
    useAuth: true,
  });
}

export async function patchLanguageInfo(userId: string, payload: LanguageInfoPayload) {
  return patchRequest({
    url: `users/${userId}/language-info`,
    data: payload,
    useAuth: true,
  });
}

export async function getLanguageInfo(userId: string): Promise<LanguageInfoPayload>  {
  return getRequest({
    url: `users/${userId}/language-info`,
    useAuth: true,
  });
} 