import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getChatVideoSetting } from "../_api/getChatVideoSetting";
import { ChatSettingPayload } from "../_api/postChatSetting";

export default function useChatVideoSetting() {
  const { data, loading, error, mutate, refetch } = useSWRFix({
    key: "chat-video-setting",
    fetcher: getChatVideoSetting,
    transform: (data: any): ChatSettingPayload => ({
      messageLength: data.messageLength,
      displayName: data.displayName,
      enableImages: data.enableImages,
      enableVideos: data.enableVideos,
      enableFiles: data.enableFiles,
      fileExtensions: data.fileExtensions,
      fileSizeLimit: data.fileSizeLimit,
      noticeStyle: data.noticeStyle,
      pageNoticeMessage: data.pageNoticeMessage,
    }),
  });
  return {
    data,
    loading,
    error,
    mutate,
    refetch,
  };
} 