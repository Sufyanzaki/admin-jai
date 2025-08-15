"use client";
import { Input } from "@/components/client/ux/input";
import { MoreVertical, Search } from "lucide-react";
import ImageWrapper from "@/components/client/image-wrapper";
import { Chat } from "../_types/allChats";
import { useSession } from "next-auth/react";
import { formatDate } from "date-fns";


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

  const { data: session } = useSession();
  const userId = session?.user?.id ? Number(session?.user?.id) : undefined;

  const currentUser = chatData.map(chat => chat.users.find(user => Number(user?.id) === userId)).find(user => user);

  return (
    <div className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col py-3 lg:px-3">
      <div className="px-4 pt-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50">
        <div className=" flex flex-row justify-between items-center w-full">
          <div className="flex items-center justify-start gap-3">
            <ImageWrapper
              src={currentUser?.image ? currentUser.image : "https://picsum.photos/128"}
              alt={"placeholder"}
              className="w-10 h-10 rounded-[5px] object-cover"
            />
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {currentUser?.firstName} {currentUser?.lastName}
            </h4>
          </div>
          <div>
            <MoreVertical className="text-gray-500" />
          </div>
        </div>
      </div>
      {/* Search */}
      <div className="p-4 lg:py-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
          <Input
            placeholder="Search or start new chat"
            className="pl-10 bg-white"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto max-h-[86vh] scrollbar-hide-until-hover">
        {/* Chats Section */}
        <div className="scrollbar-hide-until-hover overflow-y-auto max-h-[70vh]">
          <h3 className="text-sm font-semibold p-4 lg:p-3">Chats</h3>
          <div className="divide-y divide-gray-200">
            {chatData?.map((chat) => {
              const contactUser = chat.users.find(user => user?.id !== session?.user?.id);
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
                    {/* {chat.unread && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-app-blue rounded-full"></div>
                    )} */}
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
                      {/* {chat.lastMessage} */}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contacts Section */}
        {/* <div className="scrollbar-hide-until-hover border-t border-app-border overflow-y-auto max-h-[50vh]">
          <h3 className="text-sm font-semibold lg:py-3 p-4">Contacts</h3>
          <div className="">
            {contactData.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-3 p-4 lg:py-3 rounded-[5px] cursor-pointer hover:bg-gray-50"
              >
                <ImageWrapper
                  src={"https://picsum.photos/128"}
                  alt={contact.name}
                  className="w-10 h-10 rounded-[5px] object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {contact.name}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {contact.timestamp}
                    </span>
                  </div>
                  <p className="text-[12px] text-gray-600 truncate">
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
