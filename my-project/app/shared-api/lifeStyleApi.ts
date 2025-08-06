import {getRequest, patchRequest, postRequest} from "@/shared-lib";
import {MemberLifeStyle} from "@/app/shared-types/member";

type Payload = Partial<MemberLifeStyle>;

export async function postLifeStyle(userId: string, payload: Payload): Promise<MemberLifeStyle> {
  const r = await postRequest<Payload>({
    url: `users/${userId}/lifestyle`,
    data: payload,
    useAuth: true,
  });
  return r.response
}

export async function patchLifeStyle(userId: string, payload: Payload):Promise<MemberLifeStyle> {
  const r = await patchRequest<Payload>({
    url: `users/${userId}/lifestyle`,
    data: payload,
    useAuth: true,
  });
  return r.response
}

export async function getLifeStyle(userId: string): Promise<MemberLifeStyle> {
  return getRequest({
    url: `users/${userId}/lifestyle`,
    useAuth: true,
  });
} 