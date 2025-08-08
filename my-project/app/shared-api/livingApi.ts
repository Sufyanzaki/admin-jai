import {postRequest, patchRequest, getRequest} from "@/shared-lib";
import {MemberLocation} from "@/app/shared-types/member";

export async function postUserLocation(id: string, payload: Partial<MemberLocation>) {
  return postRequest({
    url: `users/${id}/living`,
    data: payload,
    useAuth: true,
  });
}

export async function patchUserLocation(id: string, payload: Partial<MemberLocation>) {
  return patchRequest({
    url : `users/${id}/living`,
    data: payload,
    useAuth: true,
  });
}

export async function getUserLocation(id: string): Promise<MemberLocation | undefined> {
  return await getRequest({
    url: `users/${id}/living`,
    useAuth: true
  })
}