import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { addLanguage } from "@/app/(dashboard)/settings/_api/addLanguage";
import useSWRMutation from "swr/mutation";
import { mutate as globalMutate } from "swr";
import type { Language } from "@/app/(dashboard)/settings/_api/getLanguages";

const languageSchema = z.object({
  name: z.string().min(1, "Language name is required"),
  code: z.string().min(1, "Language code is required"),
  status: z.enum(["active", "inactive"], { required_error: "Status is required" }),
});

export type LanguageFormValues = z.infer<typeof languageSchema>;

export default function useLanguageForm() {
  const { trigger, isMutating } = useSWRMutation(
    "addLanguage",
    async (_: string, { arg }: { arg: LanguageFormValues }) => {
      return await addLanguage({
        name: arg.name,
        code: arg.code,
        isActive: arg.status === "active",
      });
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message });
        console.error("Language creation error:", error);
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
    watch,
    control,
  } = useForm<LanguageFormValues>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      name: "",
      code: "",
      status: undefined,
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: LanguageFormValues, callback?: (data: any) => void) => {
    try {
      const result = await trigger(values);
      if (result) {
        showSuccess("Language added successfully!");
        reset();
        // Optimistically update the languages-list cache by pushing the new language
        globalMutate("languages-list", (current: Language[] = []) => [
          ...current,
          {
            name: values.name,
            code: values.code,
            status: values.status === "active" ? "Active" : "Inactive",
          },
        ], false);
        callback?.(result);
      }
    } catch (error: any) {
      showError({ message: error.message });
      console.error("Language creation error:", error);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    register,
    setValue,
    watch,
    control,
    reset,
  };
} 