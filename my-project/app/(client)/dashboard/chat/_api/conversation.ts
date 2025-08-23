import {getRequest, patchRequest, postRequest} from "@/shared-lib";
import {BannerDto} from "@/app/admin/(dashboard)/marketing/banners/_types/bannerTypes";
import {ChatResponse} from "@/app/(client)/dashboard/chat/_types/conversation";
import {ChatMessagesResponse} from "@/app/(client)/dashboard/chat/_types/message";
import { ChatsResponse } from "../_types/allChats";

type Payload = {
    userId: string;
}

type MessageProps = {
    chatId: string;
    content: string;
}

export async function createChat(props: Payload): Promise<ChatResponse | undefined> {
    const r = await postRequest<Payload>({
        url: 'chat',
        data: props,
        useAuth: true
    });
    return r.response;
}

export async function sendMessage(props: MessageProps): Promise<undefined> {
    const r = await postRequest<MessageProps>({
        url: `message`,
        data: props,
        useAuth: true
    });
    return r.response
}

export async function getAllChats(): Promise<ChatsResponse | undefined> {
    return await getRequest({
        url: 'chat/user-chats',
        useAuth: true
    });
}

export async function getChatDetails(id: string): Promise<ChatMessagesResponse> {
    return await getRequest({
        url: `message/${id}`,
        useAuth: true
    })
}

export async function resetMessages(): Promise<undefined> {
    const r = await patchRequest({
        url: `chat/reset-message-count`,
        data: {},
        useAuth: true
    });
    return r.response;
}