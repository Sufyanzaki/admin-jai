"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { patchFooterSettings, FooterFormData } from "../_api/footerApi";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { imageUpload } from "@/admin-utils/utils/imageUpload";
import useSWRMutation from "swr/mutation";
import { useState, useEffect } from "react";
import { useSWRConfig } from "swr";
import { useFooterSettings } from "./useFooterSettings";

const footerFormSchema = z.object({
  footerLogo: z.any().optional(),
  footerDescription: z.string().min(1, "Footer description is required"),
  linkName: z.string().min(1, "Link name is required"),
  searchName: z.string().min(1, "Search name is required"),
  footerContent: z.string().min(1, "Footer content is required"),
});

export type FooterFormValues = z.infer<typeof footerFormSchema>;

export function useFooterForm() {
  const { mutate: globalMutate } = useSWRConfig();
  const { data: footerData, isLoading: isLoadingFooterData } = useFooterSettings();

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

  // Reset form values when footer data is loaded
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

  // SWR mutation trigger for footer update
  const { trigger, isMutating } = useSWRMutation(
    "patchFooterSettings",
    async (_: string, { arg }: { arg: FooterFormData }) => {
      try {
        const result = await patchFooterSettings(arg);
        return result;
      } catch (err: any) {
        throw err;
      }
    },
    {
      onError: (error: any) => {
        setError(error?.message || "Failed to update footer settings");
        showError({ message: error?.message || "Failed to update footer settings" });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: FooterFormValues, callback?: (data: any) => void) => {
    setError(null);
    
    try {
      // Handle image upload if footerLogo is a File
      let footerLogoUrl = values.footerLogo;
      if (values.footerLogo instanceof File) {
        footerLogoUrl = await imageUpload(values.footerLogo);
      }

      // Prepare payload for API
      const payload: FooterFormData = {
        ...values,
        footerLogo: footerLogoUrl || undefined,
      };

      const result = await trigger(payload);

      // Update cache after successful update
      globalMutate(
        "footer-settings",
        (current: any) => {
          return result;
        },
        false
      );

      showSuccess("Footer settings updated successfully!");
      callback?.(result);
    } catch (error: any) {
      setError(error?.message || "Failed to update footer settings");
      showError({ message: error?.message || "Failed to update footer settings" });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isSubmitting || isMutating || isLoadingFooterData,
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