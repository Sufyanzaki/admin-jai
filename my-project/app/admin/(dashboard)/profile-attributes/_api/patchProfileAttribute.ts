import { patchRequest } from "@/shared-lib";

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