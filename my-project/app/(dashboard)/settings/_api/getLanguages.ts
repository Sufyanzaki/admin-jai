import { getRequest } from "@/admin-utils";

export interface Language {
  name: string;
  code: string;
  image?: string;
  id: string;
  isActive: boolean;
}

export async function getLanguages(): Promise<Language[]> {
  return getRequest<Language[]>({
    url: "setting/language",
    useAuth: true,
  });
} 