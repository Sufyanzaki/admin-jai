import { showError, showSuccess } from "@/shared-lib";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { updateTranslation } from "@/app/admin/(dashboard)/settings/languages/[id]/_api/translationApi";
import { useParams } from "next/navigation";
import useSWRMutation from "swr/mutation";

export default function useEditTranslation() {
    const { t } = useTranslation();
    const params = useParams();
    const languageId = typeof params.id === 'string' ? params.id : params.id?.[0] || '';

    const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
    const [modifiedValues, setModifiedValues] = useState<Record<string, string>>({});

    const { trigger, isMutating } = useSWRMutation(
        `update-translations-${languageId}`,
        async (_, { arg }: { arg: Record<string, string> }) => {
            return await updateTranslation(languageId, {translations: arg});
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message });
            },
            onSuccess: () => {
                showSuccess(t("Translations updated successfully!"));
                setSelectedRows({});
                setModifiedValues({});
            }
        }
    );

    const toggleRowSelection = (key: string) => {
        setSelectedRows(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const toggleSelectAll = (keys: string[], select: boolean) => {
        const newSelection = keys.reduce((acc, key) => {
            acc[key] = select;
            return acc;
        }, {} as Record<string, boolean>);
        setSelectedRows(newSelection);
    };

    const handleValueChange = (key: string, value: string) => {
        setModifiedValues(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const updateTranslations = async () => {
        const translationsPayload = Object.entries(selectedRows)
            .filter(([key, isSelected]) => isSelected && modifiedValues[key] !== undefined)
            .reduce((acc, [key]) => {
                acc[key] = modifiedValues[key];
                return acc;
            }, {} as Record<string, string>);

        if (Object.keys(translationsPayload).length === 0) {
            showError({message: t("No changes selected for update")});
            return;
        }

        await trigger(translationsPayload);
    };

    return {
        selectedRows,
        toggleRowSelection,
        toggleSelectAll,
        handleValueChange,
        updateTranslations,
        isUpdating: isMutating,
        modifiedValues,
    };
}