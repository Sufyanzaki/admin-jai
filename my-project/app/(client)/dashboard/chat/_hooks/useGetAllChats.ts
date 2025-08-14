import {useSWRFix} from "@/shared-lib";
import {getAllChats} from "@/app/(client)/dashboard/chat/_api/conversation";
import { ChatsResponse } from "../_types/allChats";

export const useGetAllChats = () => {

    const { data, loading, error, mutate } = useSWRFix<ChatsResponse>({
        key: `all-chats`,
        fetcher: async () => {
            const response = await getAllChats();
            if (!response) {
                throw new Error('Failed to fetch chat details');
            }
            return response;
        },
    });

    return {
        allChats: data?.data,
        allChatsLoading: loading,
        allChatsError: error,
        chatMutate: mutate
    };
};