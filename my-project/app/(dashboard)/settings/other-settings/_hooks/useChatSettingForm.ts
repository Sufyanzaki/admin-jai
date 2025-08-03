"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { postChatSetting, ChatSettingPayload } from "../_api/postChatSetting";
import useChatVideoSetting from "./useChatVideoSetting";
import { useEffect } from "react";

const chatSettingSchema = z.object({
  messageLength: z.coerce.number().min(1, "Message length is required"),
  displayName: z.string().min(1, "Display name is required"),
  enableImages: z.boolean(),
  enableVideos: z.boolean(),
  enableFiles: z.boolean(),
  fileExtensions: z.string().min(1, "File extensions are required"),
  fileSizeLimit: z.coerce.number().min(1, "File size limit is required"),
  noticeStyle: z.string().min(1, "Notice style is required"),
  pageNoticeMessage: z.string().min(1, "Notice message is required"),
});

export type ChatSettingFormValues = z.infer<typeof chatSettingSchema>;

export default function useChatSettingForm() {

  const { data, loading } = useChatVideoSetting();

  const { trigger, isMutating } = useSWRMutation(
    "postChatSetting",
    async (_: string, { arg }: { arg: ChatSettingFormValues }) => {
      return await postChatSetting(arg);
    },
    {
      onError: (error: Error) => {
        showError({ message: error.message });
        console.error("Chat setting error:", error);
      },
      revalidate: false,
      populateCache: false,
    }
  );

  useEffect(() => {
    if (data) reset(data);
  }, [data]);

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
        showSuccess("Chat settings updated successfully!");
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