import { postRequest, patchRequest } from "@/admin-utils";

export interface PartnerExpectationPayload {
  origin: string;
  lookingFor: string;
  length: string;
  religion: string;
  relationshipStatus: string;
  education: string;
  weight: string;
  smoke: boolean;
  drinking: boolean;
  goingOut: boolean;
  ageFrom: number;
  ageTo: number;
  city?: string,
  state?: string,
  country?: string,
}

export async function postPartnerExpectation(userId: string, payload: PartnerExpectationPayload) {
  return postRequest({
    url: `users/${userId}/partner-expectation`,
    data: payload,
    useAuth: true,
  });
}

export async function patchPartnerExpectation(userId: string, payload: PartnerExpectationPayload) {
  return patchRequest({
    url: `users/${userId}/partner-expectation`,
    data: payload,
    useAuth: true,
  });
} 