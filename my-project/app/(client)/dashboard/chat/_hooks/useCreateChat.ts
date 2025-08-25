"use client"

import { useState } from "react";
import { showError } from "@/shared-lib";
import { createChat } from "@/app/(client)/dashboard/chat/_api/conversation";
import { useTranslation } from "react-i18next";

export const useCreateChat = () => {
    const { t } = useTranslation();
    const [messageLoading, setMessageLoading] = useState(false);
    const [messageError, setMessageError] = useState<Error | null>(null);

    const sendMessageRefetch = async (userId: string) => {
        setMessageLoading(true);
        setMessageError(null);

        try {
            return await createChat({ userId });
        } catch (err) {
            showError({
                message: err instanceof Error ? err.message : t("An error occurred while creating the chat"),
            });
            setMessageError(err as Error);
            throw err;
        } finally {
            setMessageLoading(false);
        }
    };

    return { sendMessageRefetch, messageLoading, messageError };
};
