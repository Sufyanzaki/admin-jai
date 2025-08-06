import { postRequest, patchRequest, getRequest } from "@/shared-lib";
import {ProfileResponse, UserDto} from "@/app/shared-types/auth";

export type UserPayload = Partial<UserDto>;

export async function postUser(payload: UserPayload): Promise<ProfileResponse> {
  const r = await postRequest<UserPayload>({
    url: "users",
    data: payload,
    useAuth: true,
  });
  return r.response;
} 

export async function patchUser(userId: string, payload: UserPayload): Promise<ProfileResponse> {
  const r = await patchRequest<UserPayload>({
    url: `users/${userId}`,
    data: payload,
    useAuth: true,
  });
  return r.response;
}

export async function patchUserStatus(userId: string, isActive: boolean): Promise<ProfileResponse> {
  const r = await patchRequest<UserPayload>({
    url: `users/${userId}`,
    data: { isActive },
    useAuth: true,
  });
  return r.response;
} 

export async function getUser(userId: string) {
  return getRequest({
    url: `users/${userId}`,
    useAuth: true,
  });
} 