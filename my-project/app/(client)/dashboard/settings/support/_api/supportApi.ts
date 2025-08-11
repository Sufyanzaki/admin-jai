import { postRequest, patchRequest, getRequest, deleteRequest } from "@/shared-lib";
import { SupportTicketDto } from "../_types/support";

export async function createSupportTicket(payload: Omit<SupportTicketDto, "id">) {
    const r = await postRequest({
        url: "user/suport-tickets",
        data: payload,
        useAuth: true,
    });
    return r.response;
}

export async function updateSupportTicket(id: string, payload: Partial<SupportTicketDto>) {
    const r = await patchRequest({
        url: `user/suport-tickets/${id}`,
        data: payload,
        useAuth: true,
    });
    return r.response;
}

export async function getSupportTicket(id: string): Promise<SupportTicketDto | undefined> {
    return getRequest({
        url: `user/suport-tickets/${id}`,
        useAuth: true,
    });
}

export async function getAllSupportTickets(): Promise<SupportTicketDto[]> {
    return getRequest({
        url: "user/suport-tickets",
        useAuth: true,
    });
}

export async function deleteSupportTicket(id: string) {
    return deleteRequest({
        url: `user/suport-tickets/${id}`,
        useAuth: true,
    });
}