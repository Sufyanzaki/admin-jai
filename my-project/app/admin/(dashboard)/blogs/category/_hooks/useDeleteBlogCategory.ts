import useSWRMutation from "swr/mutation";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import {deleteBlogCategory} from "@/app/shared-api/blogCategoryApi";

export default function useDeleteBlogCategory() {
    const { trigger, isMutating, error } = useSWRMutation(
        'deleteBlogCategory',
        async (_: string, { arg: id }: { arg: string }) => {
            return await deleteBlogCategory(id);
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message });
            },
            onSuccess: async () => {
                showSuccess('Category deleted successfully!');
            }
        }
    );

    const deleteCategoryById = async (id: string) => {
        await trigger(id);
    };

    return {
        deleteCategoryById,
        isDeleting: isMutating,
        error,
    };
} 