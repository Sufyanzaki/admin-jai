import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import useSWRMutation from "swr/mutation";
import {showError} from "@/admin-utils/lib/formErrors";
import {showSuccess} from "@/admin-utils/lib/formSuccess";
import {patchAbusiveWords} from "../_api/postAbusiveWords";
import {useEffect} from "react";
import {useAbusiveWords} from "./useAbusiveWords";

export const abusiveWordsSchema = z.object({
  word: z.string().min(1, "At least one word is required"),
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
    defaultValues: { word: "" },
    mode: "onBlur",
  });

  const {word, wordLoading} = useAbusiveWords();

  useEffect(() => {
    if (word) reset(word);
  }, [word, reset]);

  const { trigger, isMutating } = useSWRMutation(
    "patchAbusiveWords",
    async (_: string, { arg }: { arg: AbusiveWordsFormValues }) => {
      return await patchAbusiveWords(arg);
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

  const abusiveWords = watch("word");

  const addChip = (word: string) => {
    const trimmed = word.trim();
    if (!trimmed) return;
    const wordsArr = abusiveWords.split(",").map(w => w.trim()).filter(Boolean);
    if (!wordsArr.includes(trimmed)) {
      setValue("word", [...wordsArr, trimmed].join(","), { shouldValidate: true });
    }
  };

  const removeChip = (valueToRemove: string) => {
    const wordsArr = abusiveWords.split(",").map(w => w.trim()).filter(Boolean);
    setValue(
      "word",
      wordsArr.filter((value) => value !== valueToRemove).join(","),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (values: AbusiveWordsFormValues) => {
    const result = await trigger({ word: values.word });
    if (result) {
      showSuccess("Abusive words saved successfully!");
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
    wordLoading
  };
}