import { postRequest, patchRequest, getRequest } from "@/admin-utils";

export interface UserPayloadBase {
  email: string;
  password?: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  dob: string;
  image: string;
  phone: string;
  origin: string;
  gender: string;
  age: number;
  relationshipStatus: string;
  children: boolean;
  religion: string;
  shortDescription: string;
  isActive?: boolean;
}

export type UserPayload = UserPayloadBase & Partial<{ department: string }>;

export type UserResponse = Partial<{ id: string | number }> & Record<string, any>;

export async function postUser(payload: UserPayload): Promise<UserResponse> {
  return postRequest({
    url: "users",
    data: payload,
    useAuth: true,
  });
} 

export async function patchUser(userId: string, payload: UserPayload): Promise<UserResponse> {
  return patchRequest({
    url: `users/${userId}`,
    data: payload,
    useAuth: true,
  });
}

export async function patchUserStatus(userId: string, isActive: boolean): Promise<UserResponse> {
  return patchRequest({
    url: `users/${userId}`,
    data: { isActive },
    useAuth: true,
  });
} 

export async function getUser(userId: string) {
  return getRequest({
    url: `users/${userId}`,
    useAuth: true,
  });
} 