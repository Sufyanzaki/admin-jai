import { deleteRequest } from "@/shared-lib";

export async function deleteBlogCategory(id: number): Promise<{ message: string }> {
    const r = await deleteRequest({
        url: `blog/categories/${id}`,
        useAuth: true
    });
    return r.response;
} 