import { postRequest } from "@/admin-utils";

export interface CreateStaffPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  image?: string;
  phone?: string;
  roleId: string;
}

export async function createStaffMember(payload: CreateStaffPayload) {
  return await postRequest<CreateStaffPayload>({
    url: "users",
    data: payload,
    useAuth: true,
  });
}