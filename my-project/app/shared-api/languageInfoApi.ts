import { postRequest, patchRequest, getRequest } from "@/shared-lib";
import {MemberLanguage} from "@/app/shared-types/member";

type Payload = Partial<MemberLanguage>

export async function postLanguageInfo(userId: string, payload: Payload): Promise<MemberLanguage> {
  const r = await postRequest<Payload>({
    url: `users/${userId}/language-info`,
    data: payload,
    useAuth: true,
  });
  return r.response;
}

export async function patchLanguageInfo(userId: string, payload: Payload):Promise<MemberLanguage> {
  const r = await patchRequest<Payload>({
    url: `users/${userId}/language-info`,
    data: payload,
    useAuth: true,
  });
  return r.response;
}

export async function getLanguageInfo(userId: string): Promise<Payload>  {
  return getRequest({
    url: `users/${userId}/language-info`,
    useAuth: true,
  });
} 