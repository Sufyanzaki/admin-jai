import { getRequest } from "@/shared-lib";
import {BlogDto} from "@/app/shared-types/blog";

export async function getBlogById(id: string): Promise<BlogDto> {
    return await getRequest<BlogDto>({
        url: `blog/${id}`,
        useAuth: true
    });
} 