"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { patchUserDashboardFooterSettings, UserDashboardFooterFormData } from "../_api/userDashboardFooterApi";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { useState, useEffect } from "react";
import { useSWRConfig } from "swr";
import { useDashboardFooterSetting } from "./useDashboardFooterSetting";

const dashboardFooterFormSchema = z.object({
  sectionPage: z.array(z.string()).min(1, "At least one page must be selected"),
});

export type DashboardFooterFormValues = z.infer<typeof dashboardFooterFormSchema>;

export function useDashboardFooterForm() {
  const { mutate: globalMutate } = useSWRConfig();
  const { data: dashboardFooterData, isLoading: isLoadingDashboardFooterData } = useDashboardFooterSetting();

  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
    control,
    watch,
  } = useForm<DashboardFooterFormValues>({
    resolver: zodResolver(dashboardFooterFormSchema),
    defaultValues: {
      sectionPage: [],
    },
    mode: "onBlur",
  });

  // Reset form values when dashboard footer data is loaded
  useEffect(() => {
    if (dashboardFooterData?.sectionPage) {
      // Convert comma-separated string to array
      const sectionPageArray = dashboardFooterData.sectionPage.split(',').map(page => page.trim());
      reset({
        sectionPage: sectionPageArray,
      });
    }
  }, [dashboardFooterData, reset]);

  // SWR mutation trigger for dashboard footer update
  const { trigger, isMutating } = useSWRMutation(
    "patchUserDashboardFooterSettings",
    async (_: string, { arg }: { arg: UserDashboardFooterFormData }) => {
      try {
        const result = await patchUserDashboardFooterSettings(arg);
        return result;
      } catch (err: any) {
        throw err;
      }
    },
    {
      onError: (error: any) => {
        setError(error?.message || "Failed to update dashboard footer settings");
        showError({ message: error?.message || "Failed to update dashboard footer settings" });
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: DashboardFooterFormValues, callback?: (data: any) => void) => {
    setError(null);
    
    try {
      // Convert array to comma-separated string for API
      const payload: UserDashboardFooterFormData = {
        sectionPage: values.sectionPage.join(','),
      };

      const result = await trigger(payload);

      // Update cache after successful update
      globalMutate(
        "user-dashboard-footer-settings",
        (current: any) => {
          return { success: true, data: result };
        },
        false
      );

      showSuccess("Dashboard footer settings updated successfully!");
      callback?.(result);
    } catch (error: any) {
      setError(error?.message || "Failed to update dashboard footer settings");
      showError({ message: error?.message || "Failed to update dashboard footer settings" });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isSubmitting || isMutating || isLoadingDashboardFooterData,
    setValue,
    reset,
    control,
    watch,
    onSubmit,
    error,
    trigger,
    dashboardFooterData,
    isLoadingDashboardFooterData,
  };
}