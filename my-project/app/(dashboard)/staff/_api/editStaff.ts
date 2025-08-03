import { patchRequest } from "@/admin-utils";

export interface EditStaffPayload {
  id: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  image?: string;
  phone?: string;
  roleId?: string;
}

export async function editStaffMember(data: EditStaffPayload) {
  const { id, ...otherInfo } = data;
  const r = await patchRequest<Partial<EditStaffPayload>>({
    url: `users/${id}`,
    data: otherInfo,
    useAuth: true,
  });
  return r.response;
}