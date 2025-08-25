"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { patchUserDashboardFooterSettings } from "../_api/userDashboardFooterApi";
import { showError, showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from "react";
import { useDashboardFooterSetting } from "./useDashboardFooterSetting";
import { useTranslation } from "react-i18next";


export function useDashboardFooterForm() {
  const { t } = useTranslation();

  const dashboardFooterFormSchema = z.object({
    sectionPage: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
      })
    ).min(1, t("At least one page must be selected")),
  });

  type DashboardFooterFormValues = z.infer<typeof dashboardFooterFormSchema>;

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
        // @ts-expect-error unknown type
        showError({ message: t(error.message) });
      }
    },
    {
      onError: (error: unknown) => {
        // @ts-expect-error unknown type
        showError({ message: t(error.message) }); setError(error.message);
      },
      revalidate: false,
      populateCache: false,
    }
  );

  const onSubmit = async (values: DashboardFooterFormValues, callback?: () => void) => {
    setError(null);

    try {
      await trigger(values);
      showSuccess(t("Dashboard footer settings updated successfully!"));
      callback?.();
    } catch (error: unknown) {
      // @ts-expect-error unknown type
      showError({ message: t(error.message) }); setError(error.message);
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
