import {deleteRequest} from "@/admin-utils";

export async function deleteStaff(id: string): Promise<{message: string}> {
    const r = await deleteRequest({
        url: `users/${id}`,
        useAuth: true
    });
    return r.response
}