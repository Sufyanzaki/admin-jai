import { getRequest } from "@/admin-utils";
import type { Package } from "./getAllPackages";

export async function getPackageById(id: number | string): Promise<Package> {
  return getRequest<Package>({
    url: `package/${id}`,
    useAuth: true,
  });
} 