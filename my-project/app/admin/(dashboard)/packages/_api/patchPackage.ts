import { patchRequest } from "@/shared-lib";

export interface PatchPackagePayload {
  id: number | string;
  isActive: boolean;
}

export async function patchPackage({ id, isActive }: PatchPackagePayload) {
  return patchRequest({
    url: `package/${id}`,
    data: { isActive },
    useAuth: true,
  });
} 