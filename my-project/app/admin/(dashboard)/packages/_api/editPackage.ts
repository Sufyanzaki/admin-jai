import { patchRequest } from "@/admin-utils";
import type { Package } from "./getAllPackages";

export type EditPackagePayload = Partial<Omit<Package, 'id'>> & { id: number | string };

export async function editPackage(payload: EditPackagePayload) {
  const { id, ...data } = payload;
  return patchRequest({
    url: `package/${id}`,
    data,
    useAuth: true,
  });
} 