import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError, showSuccess } from "@/shared-lib";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { useEffect } from "react";
import { FaqCategoryDto, FaqDto } from "@/app/shared-types/faq";
import { useTranslation } from "react-i18next";
import { patchFaq } from "@/app/shared-api/faqApi";



export default function useEditFaq(categories: FaqCategoryDto[], faq?: FaqDto) {
  const { mutate: globalMutate } = useSWRConfig();
  const { t } = useTranslation();

  const editFaqSchema = z.object({
    question: z.string().min(1, t("Question is required")),
    answer: z.string().min(1, t("Answer is required")),
    categoryId: z.string({ required_error: t("Category is required") }),
  });

  type EditFaqFormValues = z.infer<typeof editFaqSchema>;

  const { trigger, isMutating } = useSWRMutation(
    faq?.id ? `editFaq-${faq.id}` : null,
    async (_key, { arg }: { arg: Partial<FaqDto> }) => {
      return await patchFaq(faq!.id, arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: t(error?.message || "Failed to update FAQ") });
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
      categoryId: faq?.categoryId || '',
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (faq) {
      setValue("question", faq.question || "");
      setValue("answer", faq.answer || "");
      setValue("categoryId", faq.categoryId || '');
    }
  }, [faq, setValue]);

  const onSubmit = async (values: EditFaqFormValues, callback?: (value: boolean) => void) => {
    if (!faq?.id) return;

    const result = await trigger({
      question: values.question,
      answer: values.answer,
      categoryId: values.categoryId,
    });

    if (result) {
      showSuccess(t("FAQ updated successfully!"));
      globalMutate(
        "faqs",
        (current: FaqDto[] = []) =>
          current.map((item) =>
            item.id === faq.id
              ? {
                ...item,
                question: values.question,
                answer: values.answer,
                categoryId: values.categoryId,
                updatedAt: new Date().toISOString(),
                category: categories?.find((cat) => cat.id === values.categoryId) || item.category,
              }
              : item
          ),
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
    control,
    reset,
    setValue,
  };
}
