import { getRequest } from "@/shared-lib";

export type FaqCategory = {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  faqs: any[];
};

export async function getFaqCategories(): Promise<FaqCategory[]> {
  return await getRequest<FaqCategory[]>({
    url: "faq/categories",
    useAuth: true,
  });
}
