import { ProfileResponse } from "@/app/shared-types/auth";
import { MemberProfile } from "@/app/shared-types/member";
import { getRequest } from "@/shared-lib";

export type accpetedLikesResponseData = {
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
}

export type accpetedLikesResponse = {
    status: string; // e.g. "success"
    data: accpetedLikesResponseData[],
};

export async function getLikesAccepted(): Promise<accpetedLikesResponse> {
    return await getRequest<accpetedLikesResponse>({
        url: "/users/like/accepted",
        useAuth: true,
    });
}