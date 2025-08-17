import { ChatUser } from './conversation';
import { MemberProfile } from "@/app/shared-types/member";
import { ChatMessage } from "./message";

export interface Chat {
  id: string;
  chatName: string;
  createdAt: string;
  updatedAt: string;
  ChatUser: ChatUser[];
  messages: ChatMessage[];
}

export interface ChatsResponse {
  message: string;
  data: Chat[];
}
