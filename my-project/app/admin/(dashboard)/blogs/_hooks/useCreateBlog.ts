import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { createBlog, CreateBlogProps } from "../_api/createBlog";
import useSWRMutation from "swr/mutation";
import {imageUpload} from "@/admin-utils/utils/imageUpload";

// Define types for image fields
type ImageField = File | string | undefined;

const createBlogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    categoryId: z
        .number({ required_error: "Category is required" })
        .refine(val => val !== 0, {
            message: "Please select a category",
        }),
    bannerImage: z.union([z.instanceof(File), z.string()]).optional(),
    shortDescription: z.string().min(1, "Short description is required"),
    description: z.string().min(1, "Description is required"),
    metaTitle: z.string().min(1, "Meta title is required"),
    metaImage: z.union([z.instanceof(File), z.string()]).optional(),
    metaDescription: z.string().min(1, "Meta description is required"),
    metaKeywords: z.string().min(1, "Meta keywords are required"),
});

export type CreateBlogFormValues = z.infer<typeof createBlogSchema>;

export default function useCreateBlog() {
    const { trigger, isMutating } = useSWRMutation(
        'createBlog',
        async (_: string, { arg }: { arg: CreateBlogProps }) => {
            return await createBlog(arg);
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
        watch
    } = useForm<CreateBlogFormValues>({
        resolver: zodResolver(createBlogSchema),
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
                console.error('Image upload failed:', error);
                throw new Error('Failed to upload image');
            }
        }

        throw new Error('Image upload function not provided');
    };

    const onSubmit = async (values: CreateBlogFormValues, callback?: (data: { status: number } | undefined) => void) => {
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

            if (result?.status === 201) {
                showSuccess('Blog created successfully!');
                reset();
                callback?.(result);
            }
        } catch (error) {
            showError({
                message: error instanceof Error
                    ? error.message
                    : 'An error occurred while creating the blog'
            });
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