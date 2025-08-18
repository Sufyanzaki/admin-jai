import {deleteRequest, getRequest, patchRequest, postRequest} from "@/shared-lib";
import {AdminSupportTicketDto} from "../(client)/dashboard/settings/support/_types/support";

export async function createSupportTicket(payload: Omit<AdminSupportTicketDto, "id">) {
    const r = await postRequest({
        url: "users/support-tickets",
        data: payload,
        useAuth: true,
    });
    return r.response;
}

type ReplyPayload = {
    ticketId: string;
    message: string;
}
export async function sendReply(payload: ReplyPayload) {
    const r = await postRequest({
        url: "users/support-tickets/reply",
        data: payload,
        useAuth: true,
    });
    return r.response;
}

export async function updateSupportTicket(payload: Partial<AdminSupportTicketDto>) {
    const r = await patchRequest({
        url: `users/support-tickets/status`,
        data: payload,
        useAuth: true,
    });
    return r.response;
}

export async function getSupportTicket(id: string): Promise<AdminSupportTicketDto | undefined> {
    return getRequest({
        url: `users/support-tickets/${id}`,
        useAuth: true,
    });
}

export async function getAllSupportTickets(): Promise<AdminSupportTicketDto[]> {
    return getRequest({
        url: "users/support-tickets/all",
        useAuth: true,
    });
}

export async function deleteSupportTicket(id: string) {
    return deleteRequest({
        url: `users/support-tickets/${id}`,
        useAuth: true,
    });
}