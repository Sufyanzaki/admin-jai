"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { editBlog } from "@/app/shared-api/blogsApi";
import useSWRMutation from "swr/mutation";
import { useEffect } from "react";
import useBlogById from "../../../../shared-hooks/useBlogById";
import { imageUpload } from "@/admin-utils/utils/imageUpload";

const editBlogSchema = (t: any) => z.object({
    title: z.string().min(1, t("Title is required")),
    slug: z.string().min(1, t("Slug is required")),
    categoryId: z.number({ required_error: t("Category is required") }),
    bannerImage: z.any().optional(),
    shortDescription: z.string().min(1, t("Short description is required")),
    description: z.string().min(1, t("Description is required")),
    metaTitle: z.string().min(1, t("Meta title is required")),
    metaImage: z.any().optional(),
    metaDescription: z.string().min(1, t("Meta description is required")),
    metaKeywords: z.string().min(1, t("Meta keywords are required")),
});

export type EditBlogFormValues = z.infer<ReturnType<typeof editBlogSchema>>;

export default function useEditBlog(id: string) {
    const { t } = useTranslation();
    const { blog, loading: blogLoading, error: blogError } = useBlogById(id);

    const { trigger, isMutating } = useSWRMutation(
        "editBlog",
        async (_key, { arg }: { arg: Partial<EditBlogFormValues> }) => {
            return await editBlog(id, arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: t(error.message || "Failed to update blog") });
            },
        }
    );

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        reset,
        setValue,
        control,
    } = useForm<z.infer<ReturnType<typeof editBlogSchema>>>({
        resolver: zodResolver(editBlogSchema(t)),
        defaultValues: blog
            ? {
                title: blog.title,
                slug: blog.slug,
                categoryId: blog.categoryId,
                bannerImage: blog.bannerImage,
                shortDescription: blog.shortDescription,
                description: blog.description,
                metaTitle: blog.metaTitle,
                metaImage: blog.metaImage,
                metaDescription: blog.metaDescription,
                metaKeywords: blog.metaKeywords,
            }
            : {},
        mode: "onBlur",
    });

    useEffect(() => {
        if (blog) {
            reset({
                title: blog.title,
                slug: blog.slug,
                categoryId: blog.categoryId,
                bannerImage: blog.bannerImage,
                shortDescription: blog.shortDescription,
                description: blog.description,
                metaTitle: blog.metaTitle,
                metaImage: blog.metaImage,
                metaDescription: blog.metaDescription,
                metaKeywords: blog.metaKeywords,
            });
        }
    }, [blog, reset]);

    const onSubmit = async (
        values: z.infer<ReturnType<typeof editBlogSchema>>,
        callback?: (data: { status: number } | undefined) => void
    ) => {
        let bannerImageUrl = "";
        let metaImageUrl = "";

        if (values.bannerImage instanceof File) {
            bannerImageUrl = await imageUpload(values.bannerImage);
        } else if (typeof values.bannerImage === "string") {
            bannerImageUrl = values.bannerImage;
        }

        if (values.metaImage instanceof File) {
            metaImageUrl = await imageUpload(values.metaImage);
        } else if (typeof values.metaImage === "string") {
            metaImageUrl = values.metaImage;
        }

        const result = await trigger({
            ...values,
            bannerImage: bannerImageUrl,
            metaImage: metaImageUrl,
        });

        if (result) {
            showSuccess(t("Blog updated successfully!"));
            reset(values);
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
        control,
        blog,
        blogLoading,
        blogError,
    };
}
