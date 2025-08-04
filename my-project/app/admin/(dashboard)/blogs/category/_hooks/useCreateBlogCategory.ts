"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { createBlogCategory, CreateBlogCategoryProps } from "../_api/createBlogCategory";
import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";

const createCategorySchema = z.object({
    name: z.string().min(1, "Category name is required")
});

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;

export default function useCreateBlogCategory() {
    const { mutate: globalMutate } = useSWRConfig();
    const { trigger, isMutating } = useSWRMutation(
        'createBlogCategory',
        async (_: string, { arg }: { arg: CreateBlogCategoryProps }) => {
            return await createBlogCategory(arg);
        },
        {
            onError: (error: any) => {
                showError({ message: error.message });
                console.error('Category creation error:', error);
            }
        }
    );

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        reset,
    } = useForm<CreateCategoryFormValues>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: '',
        },
        mode: 'onBlur'
    });

    const onSubmit = async (values: CreateCategoryFormValues, callback?: (data: { status: number } | undefined) => void) => {
        const result = await trigger({ name: values.name });
        console.log('result', result);
        if (result?.status === 201) {
            showSuccess('Category created successfully!');
            reset();
            globalMutate('blog-categories', async (current: any) => {
                if (!current) return undefined;
                return [
                    ...current,
                    {
                        id: Date.now(),
                        name: values.name,
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        blogs: []
                    }
                ];
            }, false);
            callback?.(result);
        }
    };

    return {
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        register,
    };
} 