import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { editBlogCategory, EditBlogCategoryProps } from "../_api/editBlogCategory";
import useSWRMutation from "swr/mutation";

const editCategorySchema = z.object({
    name: z.string().min(1, "Category name is required")
});

export type EditCategoryFormValues = z.infer<typeof editCategorySchema>;

export default function useEditBlogCategory(id: number, initialName: string) {
    const { trigger, isMutating } = useSWRMutation(
        'editBlogCategory',
        async (_: string, { arg }: { arg: EditBlogCategoryProps }) => {
            return await editBlogCategory(id, arg);
        },
        {
            onError: (error: any) => {
                showError({ message: error.message });
            }
        }
    );

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        reset,
        setValue,
    } = useForm<EditCategoryFormValues>({
        resolver: zodResolver(editCategorySchema),
        defaultValues: {
            name: initialName,
        },
        mode: 'onBlur'
    });

    const onSubmit = async (values: EditCategoryFormValues, callback?: (data: { status: number } | undefined) => void) => {
        const result = await trigger({ name: values.name });
        if (result?.status === 200) {
            showSuccess('Category updated successfully!');
            callback?.(result);
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