import { postRequest } from "@/shared-lib";
import {SendImageRequestResponse} from "@/app/(client)/dashboard/_types/imageRequest";

export type SendRequest = {
    action: string,
}

export async function postImageRequestRespond(payload: SendRequest, notificationId: number): Promise<SendImageRequestResponse> {
    const r = await postRequest<SendRequest>({
        url: `users/image-request/${notificationId}/respond`,
        data: payload,
        useAuth: true,
    });
    return r.response;
}

export async function postImageRequest(payload: { targetId: string }): Promise<SendImageRequestResponse> {
    const r = await postRequest<{ targetId: string }>({
        url: "users/image-request",
        data: payload,
        useAuth: true,
    });
    return r.response;
}