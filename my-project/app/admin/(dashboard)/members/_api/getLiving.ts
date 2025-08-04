import {getRequest} from "@/admin-utils";

export type LivingDto = {
    country: string,
    state: string,
    city: string
}

type LivingResponse = {
    id: string,
    userId: string,
} & LivingDto;

export async function getLiving(id: string): Promise<LivingResponse | undefined> {
    return await getRequest({
        url: `users/${id}/living`,
        useAuth: true
    })
}