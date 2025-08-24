import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { mutate as globalMutate } from "swr";
import { addLanguage } from "@/app/admin/(dashboard)/settings/_api/languageApi";
import { BasicLanguageDto } from "@/app/shared-types/basic-languages";
import { useTranslation } from "react-i18next";

const languageSchema = z.object({
  name: z.string().min(1, "Language name is required"),
  code: z.string().min(1, "Language code is required"),
  status: z.enum(["active", "inactive"], { required_error: "Status is required" }),
});

export type LanguageFormValues = z.infer<typeof languageSchema>;


export default function useLanguageForm() {
  const { t } = useTranslation();

  const languageSchema = z.object({
    name: z.string().min(1, t("Language name is required")),
    code: z.string().min(1, t("Language code is required")),
    status: z.enum(["active", "inactive"], { required_error: t("Status is required") }),
  });

  type LanguageFormValues = z.infer<typeof languageSchema>;

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
      status: "active",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: LanguageFormValues, callback?: () => void) => {
    try {
      const result = await trigger(values);
      if (result) {
        showSuccess("Language added successfully!");
        reset();
        globalMutate("languages-list", (current: BasicLanguageDto[] = []) => [
          ...current,
          {
            id: result.id ?? Date.now(),
            name: values.name,
            code: values.code,
            status: values.status === "active" ? "Active" : "Inactive",
            isActive: result.isActive,
            image: result.image
          },
        ], false).finally();
        callback?.();
      }
    } catch (error: unknown) {
      if (error instanceof Error) showError({ message: error.message });
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