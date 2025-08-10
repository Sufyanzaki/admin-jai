export type SupportTicketDto = {
    id: string;
    subject: string;
    category: string;
    priority: string;
    description: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    userId?: string;
}