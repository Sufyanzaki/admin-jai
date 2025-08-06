import {getRequest} from "@/shared-lib";
import {ProfileResponse} from "@/app/shared-types/auth";


export async function getProfile(): Promise<ProfileResponse | undefined> {
    return await getRequest<ProfileResponse>({
        url: 'auth/get-me',
        useAuth: true
    })
}