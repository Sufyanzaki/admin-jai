import {getRequest, patchRequest, postRequest} from "@/shared-lib";
import {MemberProfile} from "@/app/shared-types/member";

export type UserPayload = Partial<MemberProfile> & {
  password?: string;
}

export async function postUser(payload: UserPayload): Promise<MemberProfile> {
  const r = await postRequest<UserPayload>({
    url: "users",
    data: payload,
    useAuth: true,
  });
  return r.response;
} 

export async function patchUser(userId: string, payload: UserPayload): Promise<MemberProfile> {
  const r = await patchRequest<UserPayload>({
    url: `users/${userId}`,
    data: payload,
    useAuth: true,
  });
  return r.response;
}

export async function patchUserStatus(userId: string, isActive: boolean): Promise<MemberProfile> {
  const r = await patchRequest<UserPayload>({
    url: `users/${userId}`,
    data: { isActive },
    useAuth: true,
  });
  return r.response;
} 

export async function getUser(userId: string): Promise<MemberProfile> {
  return getRequest({
    url: `users/${userId}`,
    useAuth: true,
  });
} 