"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { patchFooterSettings } from "@/app/shared-api/footerApi";
import { showError, showSuccess } from "@/shared-lib";
import { imageUpload } from "@/admin-utils/utils/imageUpload";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import { useFooterSettings } from "@/app/shared-hooks/useFooterSettings";
import { useTranslation } from "react-i18next";

export function useFooterForm() {
  const { t } = useTranslation();
  const { mutate: globalMutate } = useSWRConfig();
  const { data: footerData, isLoading: isLoadingFooterData } = useFooterSettings();

  const footerFormSchema = z.object({
    footerLogo: z.any().optional(),
    footerDescription: z.string().min(1, t("Footer description is required")),
    linkName: z.string().min(1, t("Link name is required")),
    searchName: z.string().min(1, t("Search name is required")),
    footerContent: z.string().min(1, t("Footer content is required")),
  });

  type FooterFormValues = z.infer<typeof footerFormSchema>;

  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
    control,
    watch,
  } = useForm<FooterFormValues>({
    resolver: zodResolver(footerFormSchema),
    defaultValues: {
      footerLogo: "",
      footerDescription: "",
      linkName: "",
      searchName: "",
      footerContent: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (footerData) {
      reset({
        footerLogo: footerData.footerLogo || "",
        footerDescription: footerData.footerDescription || "",
        linkName: footerData.linkName || "",
        searchName: footerData.searchName || "",
        footerContent: footerData.footerContent || "",
      });
    }
  }, [footerData, reset]);

  const { trigger, isMutating } = useSWRMutation(
    "patchFooterSettings",
    async (_: string, { arg }: { arg: FooterFormValues }) => {
      try {
        return await patchFooterSettings(arg);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong";
        throw new Error(message);
      }
    },
    {
      onError: (error: Error) => {
        setError(error?.message ? t(error.message) : t("Failed to update footer settings"));
        showError({ message: error?.message ? t(error.message) : t("Failed to update footer settings") });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: FooterFormValues, callback?: () => void) => {
    setError(null);

    try {
      let footerLogoUrl = values.footerLogo;
      if (values.footerLogo instanceof File) {
        footerLogoUrl = await imageUpload(values.footerLogo);
      }

      const payload = {
        ...values,
        footerLogo: footerLogoUrl || undefined,
      };

      await trigger(payload);

      globalMutate(
        "footer-settings",
        false
      ).finally();

      showSuccess(t("Footer settings updated successfully!"));
      callback?.();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? t(error.message)
          : t("Something went wrong");
      setError(message);
      showError({ message });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    setValue,
    reset,
    control,
    watch,
    onSubmit,
    error,
    trigger,
    footerData,
    isLoadingFooterData,
  };
}