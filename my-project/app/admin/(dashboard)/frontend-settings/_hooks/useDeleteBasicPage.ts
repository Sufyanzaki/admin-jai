import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { deleteBasicPage } from "@/app/shared-api/basicPageApi";
import { mutate as globalMutate } from "swr";
import { BasicPageDto } from "@/app/admin/(dashboard)/frontend-settings/_types/basicPage";

export const useDeleteBasicPage = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        "deleteBasicPage",
        async (key: string, { arg }: { arg: string }) => {
            return await deleteBasicPage(arg);
        },
        {
            onSuccess: async (data) => {
                const id = data.id;
                showSuccess("Page deleted successfully!");
                globalMutate(
                    "basic-pages-settings",
                    (current: BasicPageDto[] = []) =>
                        current.filter(page => String(page.id) !== String(id)),
                    false
                ).finally();
            },
            onError: (error: Error) => {
                showError({ message: error.message });
                globalMutate("basic-pages-settings").finally();
            },
        }
    );

    const deletePageById = async (id: string) => {
        await trigger(id);
    };

    return {
        deletePageById,
        isDeleting: isMutating,
        error,
    };
};