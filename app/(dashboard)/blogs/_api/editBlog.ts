import { patchRequest } from "@/admin-utils";
import { CreateBlogProps } from "./createBlog";

export async function editBlog(id: number | string, props: Partial<CreateBlogProps>): Promise<{ status: number } | undefined> {
    const r = await patchRequest<Partial<CreateBlogProps>>({
        url: `blog/${id}`,
        data: props,
        useAuth: true
    });
    return { status: r.status };
} 