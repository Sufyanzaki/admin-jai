import { getRequest } from "@/admin-utils";

export type FaqCategory = {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Faq = {
  id: number;
  question: string;
  answer: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: FaqCategory;
};

export async function getAllFaq(): Promise<Faq[]> {
  return await getRequest<Faq[]>({
    url: "faq",
    useAuth: true,
  });
}
