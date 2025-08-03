"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";

import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";

import { patchCookieSettings } from "../_api/cookieSettings";
import {useCookieSettings} from "@/app/(dashboard)/settings/_hooks/useCookieSetting";

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

  const { data: cookieSettings, loading } = useCookieSettings();

  useEffect(() => {
    if (cookieSettings) {
      reset({
        cookieText: cookieSettings.cookieText || "",
        showAgreement: cookieSettings.showAgreement ?? true,
      });
    }
  }, [cookieSettings, reset]);

  const { trigger, isMutating } = useSWRMutation(
      "cookieSettings",
      async (_: string, { arg }: { arg: CookieSettingsFormValues }) => {
        return await patchCookieSettings(arg);
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
    if (result?.status === 201 || result?.status === 200) {
      showSuccess("Cookie settings saved successfully!");
      reset(values); // Reset with updated values
    }
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    isLoading: isSubmitting || isMutating || loading,
    setValue,
    watch,
    reset,
    control,
    cookieLoading: loading
  };
}
