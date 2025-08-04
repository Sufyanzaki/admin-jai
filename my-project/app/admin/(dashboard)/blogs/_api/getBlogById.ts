import { getRequest } from "@/admin-utils";
import { Blog } from "./getAllBlogs";

export async function getBlogById(id: number | string): Promise<Blog> {
    return await getRequest<Blog>({
        url: `blog/${id}`,
        useAuth: true
    });
} 