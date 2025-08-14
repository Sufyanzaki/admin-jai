import { MemberProfile } from "@/app/shared-types/member";
import { ChatMessage } from "./message";

export interface Chat {
  id: number;
  chatName: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  users: MemberProfile[]; // Already defined elsewhere
  messages: ChatMessage[]; // You can type messages separately if needed
}

export interface ChatsResponse {
  message: string;
  data: Chat[];
}
