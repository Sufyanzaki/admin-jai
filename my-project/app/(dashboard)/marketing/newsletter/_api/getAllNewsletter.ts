import { getRequest } from "@/admin-utils";

export type Newsletter = {
  id: number;
  title: string;
  content: string;
  emails: string;
  createdAt: string;
  updatedAt: string;
};

export async function getAllNewsletter(): Promise<Newsletter[]> {
  return await getRequest<Newsletter[]>({
    url: "newsletter",
    useAuth: true,
  });
} 