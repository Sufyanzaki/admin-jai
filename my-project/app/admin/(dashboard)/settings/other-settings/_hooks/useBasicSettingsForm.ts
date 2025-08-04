"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import { patchBasicSettings } from "../_api/patchBasicSettings";
import { useBasicSettings } from "./useBasicSettings";
import { imageUpload } from "@/admin-utils/utils/imageUpload";
import { isFile } from "@/lib/utils";

const basicSettingsSchema = z.object({
  systemLogo: z.any().optional(),
  systemName: z.string().min(1, "System name is required"),
  memberPrefix: z.string().min(1, "Member prefix is required"),
  minimumAge: z.coerce.number().min(1, "Minimum age is required"),
  dateFormat: z.string().min(1, "Date format is required"),
  adminPanelTitle: z.string().min(1, "Admin panel title is required"),
  loginImage: z.any().optional(),
  loginMessage: z.string().min(1, "Login message is required"),
  maintenanceMode: z.boolean().optional(),
  defaultCurrency: z.string().min(1, "Default currency is required"),
  defaultLanguage: z.string().min(1, "Default language is required"),
  serverInformation: z.string().optional(),
  database: z.string().optional(),
});

export type BasicSettingsFormValues = z.infer<typeof basicSettingsSchema>;

export function useBasicSettingsForm() {
  const { data, loading } = useBasicSettings();
  const [systemLogoPreview, setSystemLogoPreview] = useState<string | null>(null);
  const [loginImagePreview, setLoginImagePreview] = useState<string | null>(null);
  const { trigger, isMutating } = useSWRMutation(
    "postBasicSettings",
    async (_: string, { arg }: { arg: BasicSettingsFormValues }) => {
      return await patchBasicSettings(arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BasicSettingsFormValues>({
    resolver: zodResolver(basicSettingsSchema),
    defaultValues: {
      systemLogo: undefined,
      systemName: "",
      memberPrefix: "",
      minimumAge: 18,
      dateFormat: "DD-MM-YYYY",
      adminPanelTitle: "",
      loginImage: undefined,
      loginMessage: "",
      maintenanceMode: false,
      defaultCurrency: "USD",
      defaultLanguage: "en",
      serverInformation: "",
      database: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (data) {
      reset(data);
      // Set initial image previews
      setSystemLogoPreview(data.systemLogo || null);
      setLoginImagePreview(data.loginImage || null);
    }
  }, [data, reset]);

  // Image handling functions
  const handleSystemLogoChange = (file: File | null) => {
    if (file) {
      setValue("systemLogo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSystemLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSystemLogo = () => {
    setValue("systemLogo", "");
    setSystemLogoPreview(null);
  };

  const handleLoginImageChange = (file: File | null) => {
    if (file) {
      setValue("loginImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLoginImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLoginImage = () => {
    setValue("loginImage", "");
    setLoginImagePreview(null);
  };

  const onSubmit = async (values: BasicSettingsFormValues) => {
    if (values.systemLogo && isFile(values.systemLogo)) {
      const uploaded = await imageUpload(values.systemLogo);
      if (uploaded) {
        values.systemLogo = uploaded;
      }
    }
    if (values.loginImage && isFile(values.loginImage)) {
      const uploaded = await imageUpload(values.loginImage);
      if (uploaded) {
        values.loginImage = uploaded;
      }
    }
    const result = await trigger(values);
    if (result) {
      showSuccess("Settings updated successfully!");
    }
  };

  return {
    handleSubmit,
    control,
    register,
    errors,
    isLoading: isSubmitting || isMutating,
    onSubmit,
    loading,
    data,
    setValue,
    watch,
    systemLogoPreview,
    loginImagePreview,
    handleSystemLogoChange,
    removeSystemLogo,
    handleLoginImageChange,
    removeLoginImage,
  };
} 