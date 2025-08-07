import { useSWRFix } from "@/shared-lib";
import {getChatVideoSetting} from "../_api/chatSettingApi";
import {ChatSettingDto} from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";

type Payload = Partial<ChatSettingDto>;

export default function useChatVideoSetting() {
  const { data, loading, error, mutate, refetch } = useSWRFix({
    key: "chat-video-setting",
    fetcher: getChatVideoSetting,
    transform: (data: Payload): Payload => ({
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