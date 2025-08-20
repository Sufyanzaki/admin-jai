import {User} from "@/app/(client)/dashboard/chat/_types/conversation";

export interface ChatMessage {
    id: string;
    content: string;
    time: string | null;
    senderId: number;
    chatId: number;
    createdAt: string;
    updatedAt: string;
    sender: User;
}

export interface ChatMessagesData {
    messages: ChatMessage[];
}

export interface ChatMessagesResponse {
    status: "success" | "error";
    messages: number;
    data: ChatMessagesData;
}
