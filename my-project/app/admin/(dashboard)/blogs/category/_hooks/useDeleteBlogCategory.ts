import useSWRMutation from "swr/mutation";
import { deleteBlogCategory } from "../_api/deleteBlogCategory";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";

export default function useDeleteBlogCategory() {
    const { trigger, isMutating, error } = useSWRMutation(
        'deleteBlogCategory',
        async (_: string, { arg: id }: { arg: number }) => {
            return await deleteBlogCategory(id);
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message });
            },
            onSuccess: async (_, __, options) => {
                showSuccess('Category deleted successfully!');
            }
        }
    );

    const deleteCategoryById = async (id: number) => {
        await trigger(id);
    };

    return {
        deleteCategoryById,
        isDeleting: isMutating,
        error,
    };
} 