import { postRequest, patchRequest, getRequest } from "@/admin-utils";

export interface PhysicalAppearancePayload {
  height: string;
  eyeColor: string;
  hairColor: string;
  bodyType: string;
  weight: string;
  appearance: string;
  clothing: string;
  intelligence: string;
  language: string;
  id?: string;
}

export async function postPhysicalAppearance(userId: string, payload: PhysicalAppearancePayload) {
  return postRequest({
    url: `users/${userId}/physical-appearance`,
    data: payload,
    useAuth: true,
  });
}

export async function patchPhysicalAppearance(userId: string, payload: PhysicalAppearancePayload) {
  return patchRequest({
    url: `users/${userId}/physical-appearance`,
    data: payload,
    useAuth: true,
  });
}

export async function getPhysicalAppearance(userId: string): Promise<PhysicalAppearancePayload> {
  return getRequest({
    url: `users/${userId}/physical-appearance`,
    useAuth: true,
  });
} 