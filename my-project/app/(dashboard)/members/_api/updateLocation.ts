import { postRequest, patchRequest } from "@/admin-utils";

export interface UserLocationPayload {
  city?: string;
  state?: string;
  country?: string;
  id?: string;
}

export async function postUserLocation(id: string, payload: UserLocationPayload) {
  return postRequest({
    url: `users/${id}/living`,
    data: payload,
    useAuth: true,
  });
}

export async function patchUserLocation(id: string, payload: UserLocationPayload) {
  return patchRequest({
    url : `users/${id}/living`,
    data: payload,
    useAuth: true,
  });
} 