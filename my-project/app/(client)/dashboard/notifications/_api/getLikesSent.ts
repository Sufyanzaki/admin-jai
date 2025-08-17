import { ProfileResponse } from "@/app/shared-types/auth";
import { MemberProfile } from "@/app/shared-types/member";
import { getRequest } from "@/shared-lib";

export type likesSentResponseData = {
    id: number;
    senderId: number;
    receiverId: number;
    status: "PENDING" | "ACCEPTED" | "REJECTED"; // add more statuses if needed
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    receiver: {
        id: number;
        firstName: string;
        lastName: string;
        image: string;
    };
}

export type likesSentResponse = {
    status: string; // e.g. "success"
    data: likesSentResponseData[],
};

export async function getLikesSent(): Promise<likesSentResponse> {
    return await getRequest<likesSentResponse>({
        url: "users/like/sent",
        useAuth: true,
    });
}