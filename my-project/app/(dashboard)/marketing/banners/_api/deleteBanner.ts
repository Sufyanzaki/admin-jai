import {deleteRequest} from "@/admin-utils";

export async function deleteBanner(id: string): Promise<{message: string}> {
    const r = await deleteRequest({
        url: `banner/${id}`,
        useAuth: true
    });
    return r.response
}