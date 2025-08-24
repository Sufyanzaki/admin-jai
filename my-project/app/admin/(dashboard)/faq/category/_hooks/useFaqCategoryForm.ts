"use client"

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";
import { FaqCategoryDto } from "@/app/shared-types/faq";
import { postFaqCategory } from "@/app/shared-api/faqApi";


export default function useFaqCategoryForm() {
  const { t } = useTranslation();

  const createFaqCategorySchema = z.object({
    name: z.string().min(1, t("Category name is required")),
  });

  type CreateFaqCategoryFormValues = z.infer<typeof createFaqCategorySchema>;

  const { mutate: globalMutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation(
    "createFaqCategory",
    async (_: string, { arg }: { arg: Partial<FaqCategoryDto> }) => {
      return await postFaqCategory(arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: t(error.message) });
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
    if (result) {
      showSuccess(t("FAQ Category created successfully!"));
      reset();
      globalMutate(
        "faq-categories",
        (current: FaqCategoryDto[] = []) => [
          ...current,
          {
            id: result.id ?? Date.now(),
            name: values.name,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            faqs: [],
          },
        ],
        false
      ).finally();
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
