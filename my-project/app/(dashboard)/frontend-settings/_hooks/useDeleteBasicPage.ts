import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { deleteBasicPage } from "@/app/(dashboard)/frontend-settings/_api/basicPageApi";
import { mutate as globalMutate } from "swr";
import { BasicPageDto } from "@/app/(dashboard)/frontend-settings/_types/basicPage";

export const useDeleteBasicPage = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        "deleteBasicPage",
        async (key: string, { arg }: { arg: number }) => {
            return await deleteBasicPage(arg);
        },
        {
            onSuccess: async (data) => {
                const id = data.id;
                showSuccess("Page deleted successfully!");
                globalMutate(
                    "basic-pages-settings",
                    (current: BasicPageDto[] = []) =>
                        current.filter(page => page.id !== id),
                    false
                );
            },
            onError: (error: Error) => {
                showError({ message: error.message });
                globalMutate("basic-pages-settings");
            },
        }
    );

    const deletePageById = async (id: number) => {
        await trigger(id);  // Make sure you're passing the id correctly here
    };

    return {
        deletePageById,
        isDeleting: isMutating,
        error,
    };
};