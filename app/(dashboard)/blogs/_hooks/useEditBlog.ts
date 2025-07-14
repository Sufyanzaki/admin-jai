import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { editBlog } from "../_api/editBlog";
import useSWRMutation from "swr/mutation";
import { Blog } from "../_api/getAllBlogs";
import { useEffect } from "react";
import useBlogById from "./useBlogById";

const editBlogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    categoryId: z.number({ required_error: "Category is required" }),
    bannerImage: z.any().optional(),
    shortDescription: z.string().min(1, "Short description is required"),
    description: z.string().min(1, "Description is required"),
    metaTitle: z.string().min(1, "Meta title is required"),
    metaImage: z.any().optional(),
    metaDescription: z.string().min(1, "Meta description is required"),
    metaKeywords: z.string().min(1, "Meta keywords are required"),
});

export type EditBlogFormValues = z.infer<typeof editBlogSchema>;

export default function useEditBlog(
    id: number | string,
    uploadImage?: (file: File) => Promise<string>
) {
    const { blog, loading: blogLoading, error: blogError } = useBlogById(id);
    const { trigger, isMutating } = useSWRMutation(
        'editBlog',
        async (_: string, { arg }: { arg: Partial<EditBlogFormValues> }) => {
            return await editBlog(id, arg);
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
        control,
    } = useForm<EditBlogFormValues>({
        resolver: zodResolver(editBlogSchema),
        defaultValues: blog ? {
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
        } : {},
        mode: 'onBlur'
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

    const onSubmit = async (values: EditBlogFormValues, callback?: (data: { status: number } | undefined) => void) => {
        let bannerImageUrl = '';
        let metaImageUrl = '';
        if (uploadImage) {
            bannerImageUrl = await uploadImage(values.bannerImage as File);
            metaImageUrl = await uploadImage(values.metaImage as File);
        } else {
            bannerImageUrl = typeof values.bannerImage === 'string' ? values.bannerImage : '';
            metaImageUrl = typeof values.metaImage === 'string' ? values.metaImage : '';
        }
        const result = await trigger({
            ...values,
            bannerImage: bannerImageUrl,
            metaImage: metaImageUrl,
        });
        if (result?.status === 200) {
            showSuccess('Blog updated successfully!');
            reset(values); // keep values after update
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