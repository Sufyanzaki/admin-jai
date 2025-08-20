import { ProfileResponse } from "@/app/shared-types/auth";
import { MemberProfile } from "@/app/shared-types/member";
import { getRequest } from "@/shared-lib";
import { LikeStatus } from "../_hooks/useLikesRecieved";

export type likesRecievedResponseData = {
    id: number;
    senderId: number;
    receiverId: number;
    status: "PENDING" | "ACCEPTED" | "DECLINED";  // adjust if you have more statuses
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    sender: MemberProfile;
}

export type likesRecievedResponse = {
    status: string; // e.g. "success"
    data: likesRecievedResponseData[],
};

export async function getLikesRecieved( status?: LikeStatus ): Promise<likesRecievedResponse> {
    return await getRequest<likesRecievedResponse>({
        url: `users/like/received?status=${status}`,
        useAuth: true,
    });
}