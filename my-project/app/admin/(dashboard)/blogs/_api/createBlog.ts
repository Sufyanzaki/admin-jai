import { postRequest } from "@/admin-utils";

export type CreateBlogProps = {
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
};

export async function createBlog(props: CreateBlogProps): Promise<{ status: number } | undefined> {
    const r = await postRequest<CreateBlogProps>({
        url: 'blog',
        data: props,
        useAuth: true
    });
    return { status: r.status };
} 