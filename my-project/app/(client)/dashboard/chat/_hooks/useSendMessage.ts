// import {useSWRFix} from "@/shared-lib";
// import {sendMessage} from "@/app/(client)/dashboard/chat/_api/conversation";
// import {useParams} from "next/navigation";
//
// export const useSendMessage = () => {
//     const params = useParams();
//     const chatId = Array.isArray(params.id) ? params.id[0] : params.id ?? '';
//
//     const { data, loading, error, mutate } = useSWRFix<MessageResponse>({
//         key: `send-message-${chatId}`,
//         fetcher: async (messageData: {content: string}) => {
//             const response = await sendMessage(chatId, messageData);
//             if (!response) {
//                 throw new Error('Failed to send message');
//             }
//             return response;
//         }
//     });
//
//     return {
//         messageResponse: data,
//         sending: loading,
//         sendError: error,
//         mutateMessage: mutate
//     };
// };