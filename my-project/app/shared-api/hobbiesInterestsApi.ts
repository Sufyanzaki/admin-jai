import { postRequest, patchRequest, getRequest } from "@/shared-lib";
import {MemberHobbiesInterests} from "@/app/shared-types/member";

type Payload = Partial<MemberHobbiesInterests>;

export async function postHobbiesInterests(userId: string, payload: Payload): Promise<MemberHobbiesInterests> {
  const r = await postRequest<Payload>({
    url: `users/${userId}/hobbies-interests`,
    data: payload,
    useAuth: true,
  });
  return r.response
}

export async function patchHobbiesInterests(userId: string, payload: Payload): Promise<MemberHobbiesInterests> {
  const r = await patchRequest<Payload>({
    url: `users/${userId}/hobbies-interests`,
    data: payload,
    useAuth: true,
  });
  return r.response
}

export async function getHobbiesInterests(userId: string): Promise<MemberHobbiesInterests> {
  return getRequest({
    url: `users/${userId}/hobbies-interests`,
    useAuth: true,
  });
} 