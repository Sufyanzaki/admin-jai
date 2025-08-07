import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { useSWRConfig } from "swr";
import { useEffect } from "react";
import {patchFaqCategory} from "@/app/shared-api/faqApi";
import {FaqCategoryDto} from "@/app/shared-types/faq";

const editFaqCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export type EditFaqCategoryFormValues = z.infer<typeof editFaqCategorySchema>;

export default function useEditFaqCategory(id: string | null, initialName: string) {
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
        showSuccess("FAQ Category updated successfully!");
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
      if(error instanceof Error) showError({ message: error.message || "Failed to update category" });
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
