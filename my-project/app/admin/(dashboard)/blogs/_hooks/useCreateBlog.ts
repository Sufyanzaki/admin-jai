"use client"

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import {imageUpload} from "@/admin-utils/utils/imageUpload";
import {createBlog} from "@/app/shared-api/blogsApi";
import {BlogDto} from "@/app/shared-types/blog";
import {useSWRConfig} from "swr";

type ImageField = File | string | undefined;

const createBlogSchema = (t: any) => z.object({
    title: z.string().min(1, t("Title is required")),
    slug: z.string().min(1, t("Slug is required")),
    categoryId: z
        .number({ required_error: t("Category is required") })
        .refine(val => val !== 0, {
            message: t("Please select a category"),
        }),
    bannerImage: z.union([z.instanceof(File), z.string()]).optional(),
    shortDescription: z.string().min(1, t("Short description is required")),
    description: z.string().min(1, t("Description is required")),
    metaTitle: z.string().min(1, t("Meta title is required")),
    metaImage: z.union([z.instanceof(File), z.string()]).optional(),
    metaDescription: z.string().min(1, t("Meta description is required")),
    metaKeywords: z.string().min(1, t("Meta keywords are required")),
});

export type CreateBlogFormValues = z.infer<ReturnType<typeof createBlogSchema>>;

export default function useCreateBlog() {
    const { t } = useTranslation();

    const { mutate } = useSWRConfig();

    const { trigger, isMutating } = useSWRMutation(
        'createBlog',
        async (_: string, { arg }: { arg: Partial<BlogDto> }) => {
            return await createBlog(arg);
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
        control,
        watch
    } = useForm<z.infer<ReturnType<typeof createBlogSchema>>>({
        resolver: zodResolver(createBlogSchema(t)),
        defaultValues: {
            title: '',
            slug: '',
            categoryId: 0,
            bannerImage: undefined,
            shortDescription: '',
            description: '',
            metaTitle: '',
            metaImage: undefined,
            metaDescription: '',
            metaKeywords: '',
        },
        mode: 'onBlur'
    });

    const handleImageUpload = async (image: ImageField): Promise<string> => {
        if (typeof image === 'string') return image;

        if (!image) return '';

        if (image instanceof File) {
            try {
                return await imageUpload(image);
            } catch (error) {
                console.error(t('Image upload failed:'), error);
                throw new Error(t('Failed to upload image'));
            }
        }

        throw new Error(t('Image upload function not provided'));
    };

    const onSubmit = async (values: z.infer<ReturnType<typeof createBlogSchema>>, callback?: () => void) => {
        try {
            // Process images in parallel
            const [bannerImageUrl, metaImageUrl] = await Promise.all([
                handleImageUpload(values.bannerImage),
                handleImageUpload(values.metaImage),
            ]);

            const result = await trigger({
                ...values,
                bannerImage: bannerImageUrl,
                metaImage: metaImageUrl,
            });

            if (result) {
                mutate('blogs', (current: BlogDto[] | undefined) => {
                    return current ? [result, ...current] : [result];
                }, false).finally()
                showSuccess(t('Blog created successfully!'));
                reset();
                callback?.();
            }
        } catch (error: unknown) {
            // @ts-expect-error unknown type
            showError({ message: t(error.message) });
        }
    };

    return {
        handleSubmit,
        onSubmit,
        errors,
        watch,
        isLoading: isSubmitting || isMutating,
        register,
        reset,
        setValue,
        control,
    };
}