import {getRequest, postRequest} from "@/shared-lib";
import {ChatSettingDto} from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";

type Payload = Partial<ChatSettingDto>;

export async function postChatSetting(payload: Payload) {
  return postRequest<Payload>({
    url: "chat-setting",
    data: payload,
    useAuth: true,
  });
}

export async function getChatVideoSetting(): Promise<ChatSettingDto> {
  return getRequest({
    url: "chat-setting",
    useAuth: true,
  });
}