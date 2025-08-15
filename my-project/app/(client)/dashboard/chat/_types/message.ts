import {MemberProfile} from "@/app/shared-types/member";

export interface ChatMessage {
    id: string;
    content: string;
    time: string | null;
    senderId: number;
    chatId: number;
    createdAt: string;
    updatedAt: string;
    sender: MemberProfile;
}

export interface ChatMessagesData {
    messages: ChatMessage[];
}

export interface ChatMessagesResponse {
    status: "success" | "error";
    messages: number;
    data: ChatMessagesData;
}
