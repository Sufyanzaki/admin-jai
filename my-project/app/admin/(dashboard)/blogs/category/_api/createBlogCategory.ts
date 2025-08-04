import { postRequest } from "@/admin-utils";

export type CreateBlogCategoryProps = {
    name: string;
};

export async function createBlogCategory(props: CreateBlogCategoryProps): Promise<{ status: number } | undefined> {
    const r = await postRequest<CreateBlogCategoryProps>({
        url: 'blog/categories',
        data: props,
        useAuth: true
    });
    return { status: r.status };
} 