import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { patchFaq, PatchFaqProps } from "../_api/patchFaq";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { useEffect } from "react";

const editFaqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  categoryId: z.number({ required_error: "Category is required" }),
});

export type EditFaqFormValues = z.infer<typeof editFaqSchema>;

export default function useEditFaq(faq: any, categories: any[]) {
  const { mutate: globalMutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
      faq?.id ? `editFaq-${faq.id}` : null,
      async (_key, { arg }: { arg: PatchFaqProps }) => {
        return await patchFaq(faq.id, arg);
      },
      {
        onError: (error: any) => {
          showError({ message: error?.message || "Failed to update FAQ" });
          console.error("FAQ update error:", error);
        },
      }
  );

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    control,
    reset,
    setValue,

  } = useForm<EditFaqFormValues>({
    resolver: zodResolver(editFaqSchema),
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
      categoryId: faq?.categoryId || undefined,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (faq) {
      setValue("question", faq.question || "");
      setValue("answer", faq.answer || "");
      setValue("categoryId", faq.categoryId || undefined);
    }
  }, [faq, setValue]);

  const onSubmit = async (values: EditFaqFormValues, callback?: (value: boolean) => void) => {
    if (!faq?.id) return;

    const result = await trigger({
      question: values.question,
      answer: values.answer,
      categoryId: values.categoryId,
    });

    if (result?.status === 200) {
      showSuccess("FAQ updated successfully!");
      globalMutate(
          "faqs",
          (current: any[] = []) =>
              current.map((item) =>
                  item.id === faq.id
                      ? {
                        ...item,
                        question: values.question,
                        answer: values.answer,
                        categoryId: values.categoryId,
                        updatedAt: new Date().toISOString(),
                        category: categories?.find((cat) => cat.id === values.categoryId) || null,
                      }
                      : item
              ),
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
    control,
    reset,
    setValue,
  };
}
