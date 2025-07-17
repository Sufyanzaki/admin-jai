import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWRMutation from "swr/mutation";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { postAbusiveWords } from "../_api/postAbusiveWords";
import { getAbusiveWords } from "../_api/getAbusiveWords";
import { useEffect } from "react";

export const abusiveWordsSchema = z.object({
  words: z.array(z.string().min(1, "Word cannot be empty")).min(1, "At least one word is required"),
});

export type AbusiveWordsFormValues = z.infer<typeof abusiveWordsSchema>;

export default function useAbusiveWordsForm() {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AbusiveWordsFormValues>({
    resolver: zodResolver(abusiveWordsSchema),
    defaultValues: { words: [] },
    mode: "onBlur",
  });

  useEffect(() => {
    (async () => {
      try {
        const words = await getAbusiveWords();
        setValue("words", words || [], { shouldValidate: true });
      } catch (error: any) {
        showError({ message: error.message });
      }
    })();
  }, [setValue]);

  const { trigger, isMutating } = useSWRMutation(
    "postAbusiveWords",
    async (_: string, { arg }: { arg: AbusiveWordsFormValues }) => {
      return await postAbusiveWords(arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message });
        console.error("Abusive words error:", error);
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const abusiveWords = watch("words");

  const addChip = (word: string) => {
    const trimmed = word.trim();
    if (trimmed && !abusiveWords.includes(trimmed)) {
      setValue("words", [...abusiveWords, trimmed], { shouldValidate: true });
    }
  };

  const removeChip = (valueToRemove: string) => {
    setValue(
      "words",
      abusiveWords.filter((value) => value !== valueToRemove),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (values: AbusiveWordsFormValues) => {
    const result = await trigger(values);
    if (result?.status === 201) {
      showSuccess("Abusive words saved successfully!");
      reset();
      // Optionally, refetch the abusive words here if needed
    }
  };

  return {
    abusiveWords,
    addChip,
    removeChip,
    handleSubmit,
    onSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    setValue,
    reset,
  };
} 