import { getRequest } from "@/client-utils";
import { Blog } from "./getAllBlogs";

export async function getBlogById(id: number | string): Promise<Blog> {
    return await getRequest<Blog>({
        url: `blog/${id}`,
        useAuth: true
    });
} 