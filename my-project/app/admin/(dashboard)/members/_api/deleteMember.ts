import {deleteRequest} from "@/shared-lib";

export async function deleteMember(id: string): Promise<{message: string}> {
    const r = await deleteRequest({
        url: `users/${id}`,
        useAuth: true
    });
    return r.response
}