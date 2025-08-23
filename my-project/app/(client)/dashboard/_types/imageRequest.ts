export type SendImageRequestData = {
    id: number;
    senderId: number;
    receiverId: number;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    createdAt: string;
    updatedAt: string;
    sender: {
        id: number;
        firstName: string;
        lastName: string;
        image: string;
    };
};

export type SendImageRequestResponse = {
    status: string;
    data: SendImageRequestData[],
};