import {MemberProfile} from "@/app/shared-types/member";

export type RequestDto = {
    id: string;
    senderId: number;
    receiverId: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    sender: MemberProfile;
    receiver: MemberProfile;
}

export type ApiResponseDto = {
    status: "success" | "error";
    data: RequestDto[];
}
