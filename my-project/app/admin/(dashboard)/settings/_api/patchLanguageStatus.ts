import { patchRequest } from "@/admin-utils";

export interface PatchLanguageStatusPayload {
  id: string | number;
  isActive: boolean;
}

export async function patchLanguageStatus({ id, isActive }: PatchLanguageStatusPayload) {
  return patchRequest({
    url: `setting/language/${id}`,
    data: { isActive },
    useAuth: true,
  });
} 