import {deleteRequest} from "@/shared-lib";

export async function deleteBanner(id: string): Promise<{message: string}> {
    const r = await deleteRequest({
        url: `banner/${id}`,
        useAuth: true
    });
    return r.response
}