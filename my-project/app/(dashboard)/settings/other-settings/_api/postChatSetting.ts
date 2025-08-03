import { postRequest } from "@/admin-utils";

export interface ChatSettingPayload {
  messageLength: number;
  displayName: string;
  enableImages: boolean;
  enableVideos: boolean;
  enableFiles: boolean;
  fileExtensions: string;
  fileSizeLimit: number;
  noticeStyle: string;
  pageNoticeMessage: string;
}

export async function postChatSetting(payload: ChatSettingPayload) {
  return postRequest<ChatSettingPayload>({
    url: "chat-setting",
    data: payload,
    useAuth: true,
  });
} 