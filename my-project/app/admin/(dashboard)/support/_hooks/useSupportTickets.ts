import {useSWRFix} from "@/shared-lib";
import {getAllSupportTickets} from "@/app/shared-api/supportApi";
import {AdminSupportTicketDto} from "@/app/(client)/dashboard/settings/support/_types/support";

export const useSupportTickets = () => {
    const { data, loading, error, mutate } = useSWRFix<AdminSupportTicketDto[]>({
        key: `support`,
        fetcher: async () => {
            const response = await getAllSupportTickets();
            if (!response) {
                throw new Error('Failed to fetch banner details');
            }
            return response;
        }
    });

    return {
        supportTickets: data,
        ticketsLoading: loading,
        error,
        mutate
    };
};