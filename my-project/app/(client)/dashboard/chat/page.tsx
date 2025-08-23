"use client";

import {ChatSidebar} from "./_components/chat-sidebar";
import ChatBox from "./_components/chat-box";
import {ProfileSidebar} from "./_components/profile-sidebar";
import {useEffect, useState} from "react";
import {useLaptop} from "@/hooks/use-mobile";
import {useRouter, useSearchParams} from "next/navigation";
import {MessageCircleDashed} from "lucide-react";
import {useGetAllChats} from "./_hooks/useGetAllChats";
import Preloader from "@/components/shared/Preloader";
import {Chat} from "./_types/allChats";
import {useSession} from "next-auth/react";
import {resetMessages} from "@/app/(client)/dashboard/chat/_api/conversation";

export default function ChatPage() {
  const isAboveLaptop = !useLaptop();
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");

  const session = useSession();
  const userId = session?.data?.user?.id ? Number(session?.data?.user?.id) : 0;

  const { allChats, allChatsError, allChatsLoading } = useGetAllChats();
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (chatId && allChats) {
      const chat = allChats?.find((c) => String(c.id) === chatId);
      if (chat) setSelectedChat(chat);
    }
  }, [chatId, allChats]);

  useEffect(() => {
    resetMessages().finally()
  }, []);

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleSelectChat = (chat: Chat) => {
    if (isAboveLaptop) {
      const fullChat = allChats && allChats?.find((c) => c.id === chat.id);
      if (fullChat) setSelectedChat(fullChat);
    } else router.push(`/dashboard/chat/${chat?.id}`);
  };

  if (allChatsLoading) {
    return (
      <div className="flex items-center flex-col justify-center h-64">
        <Preloader />
        <p className="text-sm">Loading your chats information...</p>
      </div>
    );
  }

  if (allChatsError) {
    return (
      <div className="flex items-center flex-col justify-center h-64 gap-3">
        <h2 className="text-2xl font-bold text-red-600">
          Error loading your chats
        </h2>
        <p className="text-muted-foreground">{allChatsError.message}</p>
      </div>
    );
  }

  const otherParticipant = selectedChat?.ChatUser?.filter(user => Number(user.userId) !== userId);
  const otherParticipantDetails = otherParticipant && otherParticipant[0]?.user;

  return (
    <>
      <div className="relative">
        <div
          className="hidden lg:flex flex-1 relative"
          style={{
            height: "calc(100dvh - 125px)",
          }}
        >
          {allChats &&
            <ChatSidebar
              chatData={allChats}
              selectedChat={selectedChat}
              onSelectChat={handleSelectChat}
            />}

          {selectedChat == null || !selectedChat ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center h-full">
              <MessageCircleDashed className="text-app-blue w-12 h-12" />
              <h2 className="text-app-blue font-semibold text-xl">
                Select to start chat!
              </h2>
            </div>
          ) : (
            <ChatBox
              selectedChat={selectedChat}
              onProfileClick={handleProfileClick}
            />
          )}

          {showProfile && otherParticipantDetails && <ProfileSidebar user={otherParticipantDetails} onClose={handleCloseProfile} />}
        </div>
      </div>
      <div className="lg:hidden flex w-full mb-12">
        {allChats &&
          <ChatSidebar
            chatData={allChats}
            selectedChat={selectedChat}
            onSelectChat={handleSelectChat}
          />}
      </div>
    </>
  );
}
