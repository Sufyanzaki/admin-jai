import {getRequest} from "@/shared-lib";

export async function getActivity(): Promise<undefined> {
    return await getRequest<undefined>({
        url: 'auth/get-activities',
        useAuth: true
    })
}