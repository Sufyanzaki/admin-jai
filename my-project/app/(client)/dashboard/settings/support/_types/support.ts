type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
};

export type ReplyDto = {
    id: number;
    ticketId: number;
    senderId: number;
    message: string;
    createdAt: string;
    sender: {
        id: number;
        role: string;
        firstName: string;
        lastName: string;
    };
};

export type AdminSupportTicketDto = {
    id: string;
    userId: number;
    subject: string;
    category: string;
    priority: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    replies: ReplyDto[];
};

