import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWRMutation from "swr/mutation";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { postCookieSettings } from "../_api/postCookieSettings";

export const cookieSettingsSchema = z.object({
  cookieText: z.string().min(1, "Cookie agreement text is required"),
  showAgreement: z.boolean(),
});

export type CookieSettingsFormValues = z.infer<typeof cookieSettingsSchema>;

export default function useCookieSettingsForm() {
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CookieSettingsFormValues>({
    resolver: zodResolver(cookieSettingsSchema),
    defaultValues: {
      cookieText: "",
      showAgreement: true,
    },
    mode: "onBlur",
  });

  const { trigger, isMutating } = useSWRMutation(
    "postCookieSettings",
    async (_: string, { arg }: { arg: CookieSettingsFormValues }) => {
      return await postCookieSettings(arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message });
        console.error("Cookie settings error:", error);
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: CookieSettingsFormValues) => {
    const result = await trigger(values);
    if (result?.status === 201) {
      showSuccess("Cookie settings saved successfully!");
      reset();
    }
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    setValue,
    watch,
    reset,
    control,
  };
} 