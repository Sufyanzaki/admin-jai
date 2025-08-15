import {useSWRFix} from "@/shared-lib";
import {getChatDetails} from "@/app/(client)/dashboard/chat/_api/conversation";
import {useParams} from "next/navigation";
import {ChatMessagesResponse} from "@/app/(client)/dashboard/chat/_types/message";

type ChatDetails = {
    chatId?: string;
}

export const useChatDetails = ({chatId}: ChatDetails) => {

    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? '';
    const chatIdFromUrl = chatId ?? id;

    const { data, loading, error, mutate } = useSWRFix<ChatMessagesResponse>({
        key: `chat-details-${chatIdFromUrl}`,
        fetcher: async () => {
            const response = await getChatDetails(chatIdFromUrl);
            if (!response) throw new Error('Failed to fetch chat details');
            return response;
        },
    });

    return {
        chatDetails: data,
        chatLoading: loading,
        chatError: error,
        chatMutate: mutate
    };
};