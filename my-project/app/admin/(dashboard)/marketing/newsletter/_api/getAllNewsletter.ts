import { getRequest } from "@/shared-lib";

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