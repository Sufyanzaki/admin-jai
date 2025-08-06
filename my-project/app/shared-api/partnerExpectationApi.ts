import { postRequest, patchRequest } from "@/shared-lib";
import {MemberPartnerExpectations} from "@/app/shared-types/member";

type Payload = Partial<MemberPartnerExpectations>;

export async function postPartnerExpectation(userId: string, payload: Payload) {
  const r = await postRequest<Payload>({
    url: `users/${userId}/partner-expectation`,
    data: payload,
    useAuth: true,
  });
  return r.response;
}

export async function patchPartnerExpectation(userId: string, payload: Payload) {
  const r = await patchRequest<Payload>({
    url: `users/${userId}/partner-expectation`,
    data: payload,
    useAuth: true,
  });
  return r.response;
} 