import { showError, showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { mutate as globalMutate } from "swr";
import { FooterSectionDto } from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";
import { deleteFooterSectionDetails } from "@/app/shared-api/footerApi";
import { useState } from "react";

export const useFooterSectionDelete = () => {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { trigger, error } = useSWRMutation(
        "delete-footer-section",
        async (_: string, { arg }: { arg: string }) => {
            return await deleteFooterSectionDetails(arg);
        },
        {
            onSuccess: async (deletedItem: { id: string }) => {
                showSuccess("Page deleted successfully!");
                await globalMutate(
                    "footer-all-settings",
                    (current: FooterSectionDto[] = []) =>
                        current.filter((item) => item.id !== deletedItem.id),
                    false
                );
                setDeletingId(null);
            },
            onError: (error: Error) => {
                showError({ message: error.message });
                setDeletingId(null);
                globalMutate("footer-all-settings").finally();
            },
        }
    );

    const deletePageById = async (id: string) => {
        setDeletingId(id);
        await trigger(id);
    };

    const deleteLoading = (id: string) => deletingId === id;

    return {
        deletePageById,
        deleteLoading,
        error,
    };
};
