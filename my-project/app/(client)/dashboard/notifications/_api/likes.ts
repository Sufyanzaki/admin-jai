import {getRequest, postRequest} from "@/shared-lib";
import {ApiResponseDto, RequestDto} from "@/app/(client)/dashboard/notifications/_types/notification";

type Payload = Partial<RequestDto>

export async function getLikesAccepted(): Promise<ApiResponseDto> {
    return await getRequest({
        url: "users/like/accepted",
        useAuth: true,
    });
}

export async function getLikesReceived({status}: Payload ): Promise<ApiResponseDto> {
    return await getRequest({
        url: `users/like/received?status=${status}`,
        useAuth: true,
    });
}

export async function postLikeResponse(payload: Payload, userId: number): Promise<ApiResponseDto> {
    const r = await postRequest<Payload>({
        url: `users/like/${userId}/respond`,
        data: payload,
        useAuth: true,
    });
    return r.response;
}

export async function getLikesSent(): Promise<ApiResponseDto> {
    return await getRequest({
        url: "users/like/sent",
        useAuth: true,
    });
}

export async function postLike(payload: Payload): Promise<ApiResponseDto> {
    const r = await postRequest<Payload>({
        url: "users/like",
        data: payload,
        useAuth: true,
    });
    return r.response;
}