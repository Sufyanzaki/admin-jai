"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {patchUserDashboardFooterSettings} from "../_api/userDashboardFooterApi";
import {showError, showSuccess} from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import {useEffect, useState} from "react";
import {useDashboardFooterSetting} from "./useDashboardFooterSetting";

const dashboardFooterFormSchema = z.object({
  sectionPage: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
      })
  ).min(1, "At least one page must be selected"),
});

export type DashboardFooterFormValues = z.infer<typeof dashboardFooterFormSchema>;

export function useDashboardFooterForm() {
  const { data: dashboardFooterData, isLoading: isLoadingDashboardFooterData } = useDashboardFooterSetting();

  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
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

  useEffect(() => {
    if (dashboardFooterData?.data.sectionPage) {
      const titles = dashboardFooterData.data.sectionPage
          .split(",")
          .map((t: string) => t.trim());

      const urls = (dashboardFooterData.data.pages || "")
          .split(",")
          .map((u: string) => u.trim());

      const sectionPageArray = titles.map((title, idx) => ({
        title,
        url: urls[idx],
      }));

      reset({
        sectionPage: sectionPageArray,
      });
    }
  }, [dashboardFooterData, reset]);

  const { trigger, isMutating } = useSWRMutation(
      "patchUserDashboardFooterSettings",
      async (_: string, { arg }: { arg: DashboardFooterFormValues }) => {
        try {
          const payload = {
            ...dashboardFooterData?.data,
            sectionPage: arg.sectionPage.map((p) => p.title).join(","),
            pages: arg.sectionPage.map((p) => p.url).join(","),
          };
          return await patchUserDashboardFooterSettings(payload);
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : "Something went wrong";
          showError({ message });
        }
      },
      {
        onError: (error: unknown) => {
          const message = error instanceof Error ? error.message : "Failed to update dashboard footer settings";
          setError(message);
          showError({ message });
        },
        revalidate: false,
        populateCache: false,
      }
  );

  const onSubmit = async (values: DashboardFooterFormValues, callback?: () => void) => {
    setError(null);

    try {
      await trigger(values);
      showSuccess("Dashboard footer settings updated successfully!");
      callback?.();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to update dashboard footer settings";
      showError({ message });
    }
  };

  return {
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
