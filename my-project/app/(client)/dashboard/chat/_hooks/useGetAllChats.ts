import { useSWRFix } from "@/shared-lib";
import { getAllChats } from "@/app/(client)/dashboard/chat/_api/conversation";
import { ChatResponse } from "../_types/conversation";
import { ChatsResponse } from "../_types/allChats";
import { useTranslation } from "react-i18next";

export const useGetAllChats = () => {
    const { t } = useTranslation();
    const { data, loading, error, mutate } = useSWRFix<ChatsResponse>({
        key: `all-chats`,
        fetcher: async () => {
            const response = await getAllChats();
            if (!response) {
                throw new Error(t('Failed to fetch chat details'));
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