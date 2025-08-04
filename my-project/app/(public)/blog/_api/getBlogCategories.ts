import { getRequest } from "@/client-utils";

export type Category = {
    id: number;
    name: string;
    isActive: number;
    createdAt: string;
    updatedAt: string;
};

export type BlogCategoryResponse = Category[];

export async function getBlogCategories(): Promise<BlogCategoryResponse> {
    return await getRequest<BlogCategoryResponse>({
        url: 'blog/categories',
        useAuth: true
    });
} 