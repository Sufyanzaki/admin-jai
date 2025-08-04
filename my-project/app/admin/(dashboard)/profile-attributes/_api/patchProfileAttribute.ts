import { patchRequest } from "@/admin-utils";

export interface PatchProfileAttributePayload {
  options: string;
  isVisible: boolean;
}

export async function patchProfileAttribute(id: string, payload: PatchProfileAttributePayload) {
  return patchRequest({
    url: `profile-attribute/${id}`,
    data: payload,
    useAuth: true,
  });
} 