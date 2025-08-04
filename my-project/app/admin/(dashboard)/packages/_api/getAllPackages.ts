import { getRequest } from "@/shared-lib";

export interface Package {
  id: number;
  name: string;
  price: number;
  image: string;
  validity: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  features: string;
}

export async function getAllPackages(): Promise<Package[]> {
  return getRequest<Package[]>({
    url: "package",
    useAuth: true,
  });
} 