"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWRMutation from "swr/mutation";

import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import { patchSeoSettings } from "../_api/seoSettings";
import { imageUpload } from "@/admin-utils/utils/imageUpload";
import { useSeoSettings } from "@/app/admin/(dashboard)/settings/_hooks/useSeoSettings";
import { useTranslation } from "react-i18next";


export default function useSeoSettingsForm() {

  const { t } = useTranslation();

  const seoSettingsSchema = z.object({
    metaTitle: z.string().min(1, t("Meta title is required")),
    metaDescription: z.string().min(1, t("Meta description is required")),
    metaKeywords: z.string().min(1, t("Keywords are required")),
    metaImage: z.union([z.string(), z.instanceof(File), z.null()]).optional(),
  });

  type SeoSettingsFormValues = z.infer<typeof seoSettingsSchema>;

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
    register,
    control,
  } = useForm<SeoSettingsFormValues>({
    resolver: zodResolver(seoSettingsSchema),
    defaultValues: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      metaImage: null,
    },
    mode: "onBlur",
  });

  const { data, loading: isFetchingSeo, } = useSeoSettings();

  useEffect(() => {
    if (data) {
      reset({
        metaTitle: data.metaTitle || "",
        metaDescription: data.metaDescription || "",
        metaKeywords: data.metaKeywords || "",
        metaImage: data.metaImage || null,
      });
    }
  }, [data, reset]);

  const { trigger, isMutating } = useSWRMutation(
    "seoSettings",
    async (_: string, { arg }: { arg: SeoSettingsFormValues }) => {
      let metaImageUrl: string | null = null;

      if (arg.metaImage instanceof File) {
        try {
          metaImageUrl = await imageUpload(arg.metaImage);
        } catch (error: unknown) {
          // @ts-expect-error unknown type
          showError({ message: t(error.message) });
          throw error;
        }
      } else if (typeof arg.metaImage === "string") {
        metaImageUrl = arg.metaImage;
      } else {
        metaImageUrl = null;
      }

      const apiPayload = {
        metaTitle: arg.metaTitle,
        metaDescription: arg.metaDescription,
        metaKeywords: arg.metaKeywords,
        metaImage: metaImageUrl,
      };

      return await patchSeoSettings(apiPayload);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message ? t(error.message) : t("Failed to save SEO settings") });
        console.error("SEO settings error:", error);
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: SeoSettingsFormValues) => {
    const result = await trigger(values);
    if (result) {
      showSuccess(t("SEO settings saved successfully!"));
    }
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    setValue,
    watch,
    register,
    reset,
    control,
    isFetchingSeo
  };
}
