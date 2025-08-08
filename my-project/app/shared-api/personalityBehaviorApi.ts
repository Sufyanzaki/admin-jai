import { postRequest, patchRequest, getRequest } from "@/shared-lib";
import {MemberPersonalityBehavior} from "@/app/shared-types/member";

type Payload = Partial<MemberPersonalityBehavior>;

export async function postPersonalityBehavior(userId: string, payload: Payload):Promise<MemberPersonalityBehavior> {
  const r = await postRequest<Payload>({
    url: `users/${userId}/personality-behavior`,
    data: payload,
    useAuth: true,
  });
  return r.response
}

export async function patchPersonalityBehavior(userId: string, payload: Payload):Promise<MemberPersonalityBehavior> {
  const r = await patchRequest<Payload>({
    url: `users/${userId}/personality-behavior`,
    data: payload,
    useAuth: true,
  });
  return r.response
}

export async function getPersonalityBehavior(userId: string) {
  return getRequest({
    url: `users/${userId}/personality-behavior`,
    useAuth: true,
  });
} 