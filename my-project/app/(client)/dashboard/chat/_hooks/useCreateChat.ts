import {useState} from "react";
import {showError, showSuccess} from "@/shared-lib";
import {createChat} from "@/app/(client)/dashboard/chat/_api/conversation";

export const useCreateChat = () => {
    const [messageLoading, setMessageLoading] = useState(false);
    const [messageError, setMessageError] = useState<Error | null>(null);

    const sendMessageRefetch = async (userId: string) => {
        setMessageLoading(true);
        setMessageError(null);

        try {
            const res = await createChat({ userId });
            if (res) showSuccess("Chat created successfully!");
            return res;
        } catch (err) {
            showError({
                message: err instanceof Error ? err.message : "An error occurred while creating the chat",
            });
            setMessageError(err as Error);
            throw err;
        } finally {
            setMessageLoading(false);
        }
    };

    return { sendMessageRefetch, messageLoading, messageError };
};
