import { patchRequest } from "@/admin-utils";

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