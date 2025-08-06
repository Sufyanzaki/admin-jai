import { postRequest, patchRequest, getRequest } from "@/shared-lib";
import {MemberPhysicalAppearance} from "@/app/shared-types/member";

type Payload = Partial<MemberPhysicalAppearance>;

export async function postPhysicalAppearance(userId: string, payload: Payload): Promise<MemberPhysicalAppearance> {
  const r = await postRequest<Payload>({
    url: `users/${userId}/physical-appearance`,
    data: payload,
    useAuth: true,
  });
  return r.response;
}

export async function patchPhysicalAppearance(userId: string, payload: Payload): Promise<MemberPhysicalAppearance> {
  const r = await patchRequest<Payload>({
    url: `users/${userId}/physical-appearance`,
    data: payload,
    useAuth: true,
  });
  return r.response;
}

export async function getPhysicalAppearance(userId: string): Promise<Promise<MemberPhysicalAppearance>> {
  return getRequest({
    url: `users/${userId}/physical-appearance`,
    useAuth: true,
  });
} 