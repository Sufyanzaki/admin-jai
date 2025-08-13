export interface ChatMessageSender {
    firstName: string;
    email: string;
    image: string;

    id?: number;
}

export interface ChatMessage {
    id: string;
    content: string;
    time: string | null;
    senderId: number;
    chatId: number;
    createdAt: string;
    updatedAt: string;
    sender: ChatMessageSender;
}

export interface ChatMessagesData {
    messages: ChatMessage[];
}

export interface ChatMessagesResponse {
    status: "success" | "error";
    messages: number;
    data: ChatMessagesData;
}
