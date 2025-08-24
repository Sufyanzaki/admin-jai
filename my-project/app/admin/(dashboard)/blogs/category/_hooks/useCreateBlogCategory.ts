"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";
import {createBlogCategory} from "@/app/shared-api/blogCategoryApi";
import {CategoryDto} from "@/app/shared-types/blog";
import {FaqDto} from "@/app/shared-types/faq";

const createCategorySchema = (t: any) => z.object({
    name: z.string().min(1, t("Category name is required"))
});

export type CreateCategoryFormValues = z.infer<ReturnType<typeof createCategorySchema>>;

export default function useCreateBlogCategory() {
    const { t } = require('react-i18next');
    const { mutate: globalMutate } = useSWRConfig();
    const { trigger, isMutating } = useSWRMutation(
        'createBlogCategory',
        async (_: string, { arg }: { arg: Partial<CategoryDto> }) => {
            return await createBlogCategory(arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: t(error.message) });
                console.error(t('Category creation error:'), error);
            }
        }
    );

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        reset,
    } = useForm<z.infer<ReturnType<typeof createCategorySchema>>>({
        resolver: zodResolver(createCategorySchema(t)),
        defaultValues: {
            name: '',
        },
        mode: 'onBlur'
    });

    const onSubmit = async (values: z.infer<ReturnType<typeof createCategorySchema>>, callback?: () => void) => {
        const result = await trigger({ name: values.name });
        if (result) {
            showSuccess(t('Category created successfully!'));
            reset();
            globalMutate(
                'blog-categories',
                (current: CategoryDto[] = []) => {
                return [
                    ...current,
                    {
                        id: result.id ?? Date.now(),
                        name: values.name,
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        blogs: []
                    }
                ];
            }, false).finally();
            callback?.();
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