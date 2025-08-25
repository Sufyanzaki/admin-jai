"use client"

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { useSWRConfig } from "swr";
import { useEffect } from "react";
import { patchFaqCategory } from "@/app/shared-api/faqApi";
import { FaqCategoryDto } from "@/app/shared-types/faq";


export default function useEditFaqCategory(id: string | null, initialName: string) {
  const { t } = useTranslation();
  const editFaqCategorySchema = z.object({
    name: z.string().min(1, t("Category name is required")),
  });

  type EditFaqCategoryFormValues = z.infer<typeof editFaqCategorySchema>;

  const { mutate } = useSWRConfig();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    setValue,
  } = useForm<EditFaqCategoryFormValues>({
    resolver: zodResolver(editFaqCategorySchema),
    defaultValues: {
      name: initialName || "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    setValue("name", initialName || "");
  }, [initialName, setValue]);

  const onSubmit = async (values: EditFaqCategoryFormValues, callback?: (value: boolean) => void) => {
    if (!id) return;
    try {
      const result = await patchFaqCategory(id, { name: values.name });
      if (result) {
        showSuccess(t("FAQ Category updated successfully!"));
        mutate(
          "faq-categories",
          (current: FaqCategoryDto[] = []) =>
            current.map((cat) =>
              cat.id === id ? { ...cat, name: values.name, updatedAt: new Date().toISOString() } : cat
            ),
          false
        ).finally();
        callback?.(false);
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
    isLoading: isSubmitting,
    register,
    reset,
    setValue,
  };
}
