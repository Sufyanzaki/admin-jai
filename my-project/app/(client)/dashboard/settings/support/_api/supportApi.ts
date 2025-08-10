import { postRequest, patchRequest, getRequest, deleteRequest } from "@/shared-lib";
import { SupportTicketDto } from "../_types/support";

export async function createSupportTicket(payload: Omit<SupportTicketDto, "id">) {
    const r = await postRequest({
        url: "suport-tickets",
        data: payload,
        useAuth: true,
    });
    return r.response;
}

export async function updateSupportTicket(id: string, payload: Partial<SupportTicketDto>) {
    const r = await patchRequest({
        url: `suport-tickets/${id}`,
        data: payload,
        useAuth: true,
    });
    return r.response;
}

export async function getSupportTicket(id: string): Promise<SupportTicketDto | undefined> {
    return getRequest({
        url: `suport-tickets/${id}`,
        useAuth: true,
    });
}

export async function getAllSupportTickets(): Promise<SupportTicketDto[]> {
    return getRequest({
        url: "suport-tickets",
        useAuth: true,
    });
}

export async function deleteSupportTicket(id: string) {
    return deleteRequest({
        url: `suport-tickets/${id}`,
        useAuth: true,
    });
}