"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { postFaqCategory, PostFaqCategoryProps } from "../_api/postFaqCategory";
import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";

const createFaqCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export type CreateFaqCategoryFormValues = z.infer<typeof createFaqCategorySchema>;

export default function useFaqCategoryForm() {
  const { mutate: globalMutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation(
    "createFaqCategory",
    async (_: string, { arg }: { arg: PostFaqCategoryProps }) => {
      return await postFaqCategory(arg);
    },
    {
      onError: (error: any) => {
        showError({ message: error.message });
        console.error("FAQ Category creation error:", error);
      },
    }
  );

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm<CreateFaqCategoryFormValues>({
    resolver: zodResolver(createFaqCategorySchema),
    defaultValues: {
      name: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (
    values: CreateFaqCategoryFormValues,
    callback?: (value: boolean) => void
  ) => {
    const result = await trigger({ name: values.name });
    if (result?.status === 201) {
      showSuccess("FAQ Category created successfully!");
      reset();
      // Optimistically update the faq-categories cache
      globalMutate(
        "faq-categories",
        (current: any[] = []) => [
          ...current,
          {
            id: Date.now(),
            name: values.name,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            faqs: [],
          },
        ],
        false
      );
      callback?.(false);
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
