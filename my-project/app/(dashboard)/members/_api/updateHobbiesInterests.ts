import { postRequest, patchRequest, getRequest } from "@/admin-utils";

export interface HobbiesInterestsPayload {
  sports: string;
  music: string;
  kitchen: string;
  reading: string;
  tvShows: string;
}

export async function postHobbiesInterests(userId: string, payload: HobbiesInterestsPayload) {
  return postRequest({
    url: `users/${userId}/hobbies-interests`,
    data: payload,
    useAuth: true,
  });
}

export async function patchHobbiesInterests(userId: string, payload: HobbiesInterestsPayload) {
  return patchRequest({
    url: `users/${userId}/hobbies-interests`,
    data: payload,
    useAuth: true,
  });
}

export async function getHobbiesInterests(userId: string): Promise<HobbiesInterestsPayload> {
  return getRequest({
    url: `users/${userId}/hobbies-interests`,
    useAuth: true,
  });
} 