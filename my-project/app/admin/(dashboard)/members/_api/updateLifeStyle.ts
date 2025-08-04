import { postRequest, patchRequest, getRequest } from "@/admin-utils";

export interface LifeStylePayload {
  smoke: string;
  drinking: string;
  goingOut: string;
  exercise: string;
  diet: string;
  pets: string;
  travel: string;
  socialMedia: string;
  workLifeBalance: string;
  nightLife: string;
  primaryHobby: string;
}

export async function postLifeStyle(userId: string, payload: LifeStylePayload) {
  return postRequest({
    url: `users/${userId}/lifestyle`,
    data: payload,
    useAuth: true,
  });
}

export async function patchLifeStyle(userId: string, payload: LifeStylePayload) {
  return patchRequest({
    url: `users/${userId}/lifestyle`,
    data: payload,
    useAuth: true,
  });
}

export async function getLifeStyle(userId: string): Promise<LifeStylePayload> {
  return getRequest({
    url: `users/${userId}/lifestyle`,
    useAuth: true,
  });
} 