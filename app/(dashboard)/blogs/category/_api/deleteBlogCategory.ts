import { deleteRequest } from "@/admin-utils";

export async function deleteBlogCategory(id: number): Promise<{ message: string }> {
    const r = await deleteRequest({
        url: `blog/categories/${id}`,
        useAuth: true
    });
    return r.response;
} 