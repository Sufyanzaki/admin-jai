import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {showError, showSuccess} from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import {BlogCategoryDto} from "@/app/shared-types/blog";
import {editBlogCategory} from "@/app/shared-api/blogCategoryApi";

const editCategorySchema = z.object({
    name: z.string().min(1, "Category name is required")
});

export type EditCategoryFormValues = z.infer<typeof editCategorySchema>;

export default function useEditBlogCategory(id: string, initialName: string) {
    const { trigger, isMutating } = useSWRMutation(
        'editBlogCategory',
        async (_: string, { arg }: { arg: Partial<BlogCategoryDto> }) => {
            return await editBlogCategory(id, arg);
        },
        {
            onError: (error: Error) => {
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

    const onSubmit = async (values: EditCategoryFormValues, callback?: () => void) => {
        const result = await trigger({ name: values.name });
        if (result) {
            showSuccess('Category updated successfully!');
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