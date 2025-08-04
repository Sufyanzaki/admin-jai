import { postRequest, patchRequest, getRequest } from "@/admin-utils";

export interface UpdatePersonalityBehaviorPayload {
  [key: string]: boolean; // Dynamic keys for traits
}

export async function updatePersonalityBehavior(userId: string, payload: UpdatePersonalityBehaviorPayload) {
  return postRequest({
    url: `users/${userId}/personality-behavior`,
    data: payload,
    useAuth: true,
  });
}

export async function patchPersonalityBehavior(userId: string, payload: UpdatePersonalityBehaviorPayload) {
  return patchRequest({
    url: `users/${userId}/personality-behavior`,
    data: payload,
    useAuth: true,
  });
}

export async function getPersonalityBehavior(userId: string) {
  return getRequest({
    url: `users/${userId}/personality-behavior`,
    useAuth: true,
  });
} 