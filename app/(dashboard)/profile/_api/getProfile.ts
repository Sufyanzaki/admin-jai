import {getRequest} from "@/admin-utils";
import {ProfileResponse} from "../_types/profile-types";


export async function getProfile(): Promise<ProfileResponse | undefined> {
    return await getRequest<ProfileResponse>({
        url: 'auth/get-me',
        useAuth: true
    })
}