import { getRequest } from "@/admin-utils";

export interface ProfileAttributeResponse {
  id: string;
  key: string;
  label: string;
  type: string;
  options: string;
  isActive: boolean;
  isVisible: boolean;
  isRequired: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export async function getProfileAttribute(id: string): Promise<ProfileAttributeResponse[]> {
  return getRequest({
    url: `profile-attribute/${id}`,
    useAuth: true,
  });
} 