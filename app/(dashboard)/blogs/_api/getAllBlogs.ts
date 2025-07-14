import { getRequest } from "@/admin-utils";

export type Blog = {
    id: number;
    title: string;
    slug: string;
    categoryId: number;
    bannerImage: string;
    shortDescription: string;
    description: string;
    metaTitle: string;
    metaImage: string;
    metaDescription: string;
    metaKeywords: string;
    createdAt: string;
    updatedAt: string;
};

export type BlogsResponse = Blog[];

export async function getAllBlogs(): Promise<BlogsResponse> {
    return await getRequest<BlogsResponse>({
        url: 'blog',
        useAuth: true
    });
} 