"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { postChatSetting } from "../_api/chatSettingApi";
import useChatVideoSetting from "./useChatVideoSetting";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";


export default function useChatSettingForm() {
  const { t } = useTranslation();

  const chatSettingSchema = z.object({
    messageLength: z.coerce.number().min(1, t("Message length is required")),
    displayName: z.string().min(1, t("Display name is required")),
    enableImages: z.boolean(),
    enableVideos: z.boolean(),
    enableFiles: z.boolean(),
    fileExtensions: z.string().min(1, t("File extensions are required")),
    fileSizeLimit: z.coerce.number().min(1, t("File size limit is required")),
    noticeStyle: z.string().min(1, t("Notice style is required")),
    pageNoticeMessage: z.string().min(1, t("Notice message is required")),
  });

  type ChatSettingFormValues = z.infer<typeof chatSettingSchema>;

  const { data, loading } = useChatVideoSetting();

  const { trigger, isMutating } = useSWRMutation(
    "postChatSetting",
    async (_: string, { arg }: { arg: ChatSettingFormValues }) => {
      return await postChatSetting(arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: t(error.message) });
        console.error("Chat setting error:", error);
      },
      revalidate: false,
      populateCache: false,
    }
  );

  useEffect(() => {
    if (data) reset(data);
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
    watch,
    control,
  } = useForm<ChatSettingFormValues>({
    resolver: zodResolver(chatSettingSchema),
    defaultValues: {
      messageLength: 500,
      displayName: "full-name",
      enableImages: true,
      enableVideos: false,
      enableFiles: true,
      fileExtensions: "jpg,png,pdf",
      fileSizeLimit: 10485760,
      noticeStyle: "banner",
      pageNoticeMessage: "Welcome to the chat system",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: ChatSettingFormValues, callback?: (data: any) => void) => {
    const result = await trigger(values);
    if (result) {
      showSuccess(t("Chat settings updated successfully!"));
      callback?.(result);
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
    loading
  };
} 