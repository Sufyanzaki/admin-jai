export type SenderDto = {
    educationCareer: string | null;
}

export type RequestDto = {
    id: string;
    senderId: number;
    receiverId: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    sender: SenderDto;
}

export type ApiResponseDto = {
    status: "success" | "error";
    data: RequestDto[];
}
