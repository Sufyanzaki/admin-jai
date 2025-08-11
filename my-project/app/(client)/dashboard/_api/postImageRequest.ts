import { postRequest } from "@/shared-lib";

export type sendRequest = {
    targetId: number
}

export type sendImageRequestData = {
    id: number;
    senderId: number;
    receiverId: number;
    status: "PENDING" | "ACCEPTED" | "REJECTED"; // add more statuses if needed
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    sender: {
        id: number;
        firstName: string;
        lastName: string;
        image: string;
    };
};

export type sendImageRequestResponse = {
    status: string; // e.g. "success"
    data: sendImageRequestData
};


export async function postImageRequest(payload: sendRequest): Promise<sendImageRequestResponse> {
    const r = await postRequest<sendRequest>({
        url: "users/image-request",
        data: payload,
        useAuth: true,
    });
    return r.response;
} 