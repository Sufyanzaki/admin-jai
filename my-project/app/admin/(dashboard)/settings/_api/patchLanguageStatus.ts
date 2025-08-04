import { patchRequest } from "@/shared-lib";

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