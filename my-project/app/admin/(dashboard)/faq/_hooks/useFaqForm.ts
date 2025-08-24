import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import useFaqCategories from "../category/_hooks/useFaqCategories";
import { useTranslation } from "react-i18next";
import { useSWRConfig } from "swr";
import { postFaq } from "@/app/shared-api/faqApi";
import { FaqDto, FaqCategoryDto } from "@/app/shared-types/faq";



export default function useFaqForm() {
  const { data: categories, isLoading: categoriesLoading } = useFaqCategories();
  const { mutate: globalMutate } = useSWRConfig();
  const { t } = useTranslation();
  const faqSchema = z.object({
    question: z.string().min(1, t("Question is required")),
    answer: z.string().min(1, t("Answer is required")),
    categoryId: z.string({ required_error: t("Category is required") }),
  });

  type FaqFormValues = z.infer<typeof faqSchema>;

  const { trigger, isMutating } = useSWRMutation(
    "createFaq",
    async (_: string, { arg }: { arg: Partial<FaqDto> }) => {
      return await postFaq(arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: t(error.message) });
        console.error("FAQ creation error:", error);
      },
    }
  );

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    control,
    reset,
    watch
  } = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: "",
      answer: "",
      categoryId: undefined,
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: FaqFormValues, callback?: (value: boolean) => void) => {
    const result = await trigger({
      question: values.question,
      answer: values.answer,
      categoryId: values.categoryId,
    });
    if (result) {
      showSuccess(t("FAQ created successfully!"));
      reset();
      globalMutate(
        "faqs",
        (current: FaqDto[] = []) => [
          ...current,
          {
            id: result.id ?? Date.now(),
            question: values.question,
            answer: values.answer,
            categoryId: values.categoryId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            category: categories?.find((cat) => cat.id === values.categoryId) ?? ({} as FaqCategoryDto),
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
    watch,
    isLoading: isSubmitting || isMutating,
    register,
    control,
    categories,
    categoriesLoading,
  };
}
