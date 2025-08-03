import { postRequest } from "@/admin-utils";

export interface AddPackagePayload {
  name: string;
  price: number;
  validity: number;
  image: string;
  isActive: boolean;
  features: string[];
}

export async function addPackage(payload: AddPackagePayload) {
  return postRequest<AddPackagePayload>({
    url: "package",
    data: payload,
    useAuth: true,
  });
} 