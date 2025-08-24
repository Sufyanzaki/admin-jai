import { sendMessage } from "@/app/(client)/dashboard/chat/_api/conversation";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import useSWRMutation from "swr/mutation";

type ChatDetails = {
    chatID?: string;
}

export const useSendMessage = ({ chatID }: ChatDetails) => {
    const { t } = useTranslation();
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? '';
    const chatId = chatID ?? id;

    const { trigger, data, isMutating, error } = useSWRMutation(
        `chat-details-${chatId}`,
        async (_key, { arg }: { arg: { content: string } }) => {
            const response = await sendMessage({ chatId, ...arg });
            if (!response) {
                throw new Error(t("Failed to send message"));
            }
            return response;
        }
    );

    return {
        messageResponse: data,
        sending: isMutating,
        sendError: error,
        sendMessageAction: trigger,
    };
};
