"use client";
import { Input } from "@/components/client/ux/input";
import { MoreVertical, Search } from "lucide-react";
import ImageWrapper from "@/components/client/image-wrapper";
import { useSession } from "next-auth/react";
import { formatDate } from "date-fns";
import { Chat } from "../_types/allChats";
import { useProfile } from "@/app/shared-hooks/useProfile";
import Preloader from "@/components/shared/Preloader";
import type React from "react";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";


interface ChatSidebarProps {
  chatData: Chat[];
  selectedChat?: Chat;
  onSelectChat: (chat: Chat) => void;
}

export function ChatSidebar({
  chatData,
  selectedChat,
  onSelectChat,
}: ChatSidebarProps) {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const userId = session?.user?.id ? Number(session?.user?.id) : undefined;
  const { response, userLoading } = useProfile();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter chats based on search query
  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chatData;

    return chatData.filter((chat) => {
      const otherParticipant = chat.ChatUser?.filter(user => Number(user.userId) !== userId);
      const contactUser = otherParticipant && otherParticipant[0]?.user;
      const fullName = `${contactUser?.firstName || ""} ${contactUser?.lastName || ""}`.toLowerCase();
      const lastMessage = chat.messages[chat.messages.length - 1]?.content?.toLowerCase() || "";
      
      return fullName.includes(searchQuery.toLowerCase()) || 
             lastMessage.includes(searchQuery.toLowerCase());
    });
  }, [chatData, searchQuery, userId]);

  if (userLoading) return (
    <div className="flex items-center flex-col justify-center h-64">
      <Preloader />
      <p className="text-sm">Loading your chats</p>
    </div>
  )

  if (!response) return;

  return (
    <div className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col py-3 lg:px-3">
      <div className="px-4 pt-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50">
        <div className=" flex flex-row justify-between items-center w-full">
          <div className="flex items-center justify-start gap-3">
            <ImageWrapper
              src={response?.user.image ? response.user.image : "https://picsum.photos/128"}
              alt={"placeholder"}
              className="w-10 h-10 rounded-[5px] object-cover"
            />
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {response?.user.firstName} {response?.user.lastName}
            </h4>
          </div>
          <div>
            <MoreVertical className="text-gray-500" />
          </div>
        </div>
      </div>
      
      <div className="p-4 lg:py-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
          <Input
            placeholder="Search or start new chat"
            className="pl-10 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[86vh] scrollbar-hide-until-hover">
        <div className="scrollbar-hide-until-hover overflow-y-auto max-h-[70vh]">
          <h3 className="text-sm font-semibold p-4 lg:p-3"> {t("Chats")}</h3>
          <div className="divide-y divide-gray-200">
            {filteredChats?.length > 0 ? (
              filteredChats.map((chat) => {
                const otherParticipant = chat.ChatUser?.filter(user => Number(user.userId) !== userId);
                const contactUser = otherParticipant && otherParticipant[0]?.user;
                const lastMessage = chat.messages[chat.messages.length - 1];
                return (
                  <div
                    key={chat.id}
                    onClick={() => onSelectChat(chat)}
                    className={`flex items-center gap-3 py-4 px-4 lg:px-2 cursor-pointer transition-colors rounded-[5px] 
                      ${selectedChat && selectedChat?.id === chat?.id
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                      }`}
                  >
                    <div className="relative">
                      <ImageWrapper
                        src={contactUser?.image || "/placeholder.svg"}
                        alt={contactUser?.firstName || "user-avatar"}
                        className="w-10 h-10 rounded-[5px] object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                          {contactUser?.firstName} {contactUser?.lastName}
                        </h4>
                        <span className="text-sm font-medium text-gray-500">
                          {formatDate(chat.updatedAt, "dd-MM-yyyy")}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {lastMessage?.content}
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                {searchQuery ? "No chats found matching your search." : "No chats available."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
