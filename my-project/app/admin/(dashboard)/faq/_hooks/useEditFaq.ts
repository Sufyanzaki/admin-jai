import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {showError, showSuccess} from "@/shared-lib";
import {useSWRConfig} from "swr";
import useSWRMutation from "swr/mutation";
import {useEffect} from "react";
import {FaqCategoryDto, FaqDto} from "@/app/shared-types/faq";
import {patchFaq} from "@/app/shared-api/faqApi";

const editFaqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  categoryId: z.string({ required_error: "Category is required" }),
});

export type EditFaqFormValues = z.infer<typeof editFaqSchema>;

export default function useEditFaq(categories: FaqCategoryDto[], faq?: FaqDto,) {
  const { mutate: globalMutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
      faq?.id ? `editFaq-${faq.id}` : null,
      async (_key, { arg }: { arg: Partial<FaqDto> }) => {
        return await patchFaq(faq!.id, arg);
      },
      {
        onError: (error: Error) => {
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
      showSuccess("FAQ updated successfully!");
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
                        category: categories?.find((cat) => cat.id === values.categoryId) || null,
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
