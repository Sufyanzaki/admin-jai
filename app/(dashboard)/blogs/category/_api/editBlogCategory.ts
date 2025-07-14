import { patchRequest } from "@/admin-utils";

export type EditBlogCategoryProps = {
    name: string;
};

export async function editBlogCategory(id: number, props: EditBlogCategoryProps): Promise<{ status: number } | undefined> {
    const r = await patchRequest<EditBlogCategoryProps>({
        url: `blog/categories/${id}`,
        data: props,
        useAuth: true
    });
    return { status: r.status };
} 