import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { createBlog, CreateBlogProps } from "../_api/createBlog";
import useSWRMutation from "swr/mutation";

const createBlogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    categoryId: z.number({ required_error: "Category is required" }),
    bannerImage: z.any().optional(), // Accept File or string
    shortDescription: z.string().min(1, "Short description is required"),
    description: z.string().min(1, "Description is required"),
    metaTitle: z.string().min(1, "Meta title is required"),
    metaImage: z.any().optional(), // Accept File or string
    metaDescription: z.string().min(1, "Meta description is required"),
    metaKeywords: z.string().min(1, "Meta keywords are required"),
});

export type CreateBlogFormValues = z.infer<typeof createBlogSchema>;

export default function useCreateBlog(uploadImage?: (file: File) => Promise<string>) {
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

    const onSubmit = async (values: CreateBlogFormValues, callback?: (data: { status: number } | undefined) => void) => {
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
        if (result?.status === 201) {
            showSuccess('Blog created successfully!');
            reset();
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
    };
} 