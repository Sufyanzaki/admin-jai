import {ChatUser} from './conversation';
import {ChatMessage} from "./message";

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
