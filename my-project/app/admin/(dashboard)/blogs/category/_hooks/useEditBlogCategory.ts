"use client"

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {showError, showSuccess} from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import {CategoryDto} from "@/app/shared-types/blog";
import {editBlogCategory} from "@/app/shared-api/blogCategoryApi";
import { useTranslation } from "react-i18next";

const editCategorySchema = (t: any) => z.object({
    name: z.string().min(1, t("Category name is required"))
});

export type EditCategoryFormValues = z.infer<ReturnType<typeof editCategorySchema>>;

export default function useEditBlogCategory(id: string, initialName: string) {
    const { t } = useTranslation();
    const { trigger, isMutating } = useSWRMutation(
        'editBlogCategory',
        async (_: string, { arg }: { arg: Partial<CategoryDto> }) => {
            return await editBlogCategory(id, arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: t(error.message) });
            }
        }
    );

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        reset,
        setValue,
    } = useForm<z.infer<ReturnType<typeof editCategorySchema>>>({
        resolver: zodResolver(editCategorySchema(t)),
        defaultValues: {
            name: initialName,
        },
        mode: 'onBlur'
    });

    const onSubmit = async (values: z.infer<ReturnType<typeof editCategorySchema>>, callback?: () => void) => {
        const result = await trigger({ name: values.name });
        if (result) {
            showSuccess(t('Category updated successfully!'));
            callback?.();
        }
    };

    return {
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        register,
        reset,
        setValue,
    };
}