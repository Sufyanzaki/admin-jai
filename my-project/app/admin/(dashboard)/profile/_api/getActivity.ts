import {getRequest} from "@/shared-lib";

type ActivityDto = {
    id: number,
    userId: number,
    type: string,
    message: string,
    createdAt: string
}

export type ActivityResponse = {
    activities: ActivityDto[],
}

export async function getActivity(): Promise<ActivityResponse> {
    return await getRequest<ActivityResponse>({
        url: 'auth/get-activities',
        useAuth: true
    })
}