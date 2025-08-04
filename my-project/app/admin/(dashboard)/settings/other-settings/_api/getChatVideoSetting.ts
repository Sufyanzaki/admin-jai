import { getRequest } from "@/admin-utils";
import { ChatSettingPayload } from "./postChatSetting";

export async function getChatVideoSetting(): Promise<ChatSettingPayload> {
  return getRequest<ChatSettingPayload>({
    url: "chat-setting/1",
    useAuth: true,
  });
} 