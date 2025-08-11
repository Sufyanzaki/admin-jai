import {useSWRFix} from "@/shared-lib";
import {getChatDetails} from "@/app/(client)/dashboard/chat/_api/conversation";
import {useParams} from "next/navigation";
import {ChatResponse} from "@/app/(client)/dashboard/chat/_types/conversation";

export const useChatDetails = () => {

    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? '';

    const { data, loading, error, mutate } = useSWRFix<ChatResponse>({
        key: `chat-details-${id}`,
        fetcher: async () => {
            const response = await getChatDetails(id);
            if (!response) {
                throw new Error('Failed to fetch banners');
            }
            return response;
        }
    });

    return {
        chat: data,
        chatLoading: loading,
        chatError: error,
        chatMutate: mutate
    };
};