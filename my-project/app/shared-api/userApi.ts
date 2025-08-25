import {getRequest, patchRequest, postRequest} from "@/shared-lib";
import {ClientResponseDto, MemberProfile} from "@/app/shared-types/member";

export type UserPayload = Partial<MemberProfile> & {
  password?: string;
  adminId?: string;
}

export async function postUser(payload: UserPayload): Promise<MemberProfile> {
  const r = await postRequest<UserPayload>({
    url: "users",
    data: payload,
    useAuth: true,
  });
  return r.response;
}

export async function posClientUser(payload: UserPayload): Promise<ClientResponseDto> {
  const r = await postRequest<UserPayload>({
    url: "auth/register",
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

export async function newUsers(): Promise<{ten: MemberProfile[]}> {
  return getRequest({
    url: `users/new-10`,
    useAuth: true,
  });
}

export async function visitProfile(targetId: string): Promise<undefined> {
  const r = await postRequest({
    url: `users/profile-visit`,
    data: {targetId},
    useAuth: true,
  });
  return r.response
}