import { sendMessage } from "@/app/(client)/dashboard/chat/_api/conversation";
import { useParams } from "next/navigation";
import useSWRMutation from "swr/mutation";

export const useSendMessage = () => {
    const params = useParams();
    const chatId = Array.isArray(params.id) ? params.id[0] : params.id ?? "";

    const { trigger, data, isMutating, error } = useSWRMutation(
        `send-message-${chatId}`,
        async (_key, { arg }: { arg: { content: string } }) => {
            const response = await sendMessage({chatId, ...arg});
            if (!response) {
                throw new Error("Failed to send message");
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
