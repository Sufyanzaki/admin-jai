"use client"

import useSWRMutation from "swr/mutation";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { deleteBlogCategory } from "@/app/shared-api/blogCategoryApi";
import { useTranslation } from "react-i18next";

export default function useDeleteBlogCategory() {

    const { t } = useTranslation();
    const { trigger, isMutating, error } = useSWRMutation(
        'deleteBlogCategory',
        async (_: string, { arg: id }: { arg: string }) => {
            return await deleteBlogCategory(id);
        },
        {
            onError: (error: Error) => {
                showError({ message: t(error.message) });
            },
            onSuccess: async () => {
                showSuccess(t('Category deleted successfully!'));
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