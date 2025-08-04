"use client";
import { ChatSidebar } from "./_components/chat-sidebar";
import { ChatBox } from "./_components/chat-box";
import { ProfileSidebar } from "./_components/profile-sidebar";
import { useState } from "react";
import { useLaptop } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import { MessageCircleDashed } from "lucide-react";

const chatData = [
  {
    id: 1,
    name: "Bernard Langley",
    lastMessage: "See you tomorrow!",
    timestamp: "Jun 5, 2023",
    unread: true,
    avatar: "https://i.pravatar.cc/200?img=10",
    profile: {
      status: "Hi friend I'm using FreeChat",
      age: 50,
      ethnicity: "Asian",
      sexuality: "Straight",
      gender: "Female",
      eyes: "Amber",
      hair: "Red",
      body: "Big",
      hairLength: "Shaved Head",
    },
  },
  {
    id: 2,
    name: "Nunez Faulkner",
    lastMessage: "See you tomorrow!",
    timestamp: "Jun 5, 2023",
    unread: false,
    avatar: "https://i.pravatar.cc/200?img=20",
    profile: {
      status: "Available for chat",
      age: 28,
      ethnicity: "Hispanic",
      sexuality: "Straight",
      gender: "Male",
      eyes: "Brown",
      hair: "Black",
      body: "Athletic",
      hairLength: "Short",
    },
  },
  {
    id: 3,
    name: "Edwards Mckenzie",
    lastMessage: "See you tomorrow!",
    timestamp: "Jun 5, 2023",
    unread: true,
    avatar: "https://i.pravatar.cc/200?img=30",
    profile: {
      status: "Looking for friends",
      age: 32,
      ethnicity: "Caucasian",
      sexuality: "Straight",
      gender: "Male",
      eyes: "Blue",
      hair: "Blonde",
      body: "Average",
      hairLength: "Medium",
    },
  },
  {
    id: 4,
    name: "Elise Melendez",
    lastMessage: "See you tomorrow!",
    timestamp: "Jun 5, 2023",
    unread: false,
    avatar: "https://i.pravatar.cc/200?img=40",
    profile: {
      status: "New to the app",
      age: 26,
      ethnicity: "Hispanic",
      sexuality: "Straight",
      gender: "Female",
      eyes: "Green",
      hair: "Brown",
      body: "Slim",
      hairLength: "Long",
    },
  },
  {
    id: 5,
    name: "Michael Wagner",
    lastMessage: "See you tomorrow!",
    timestamp: "Jun 5, 2023",
    unread: false,
    avatar: "https://i.pravatar.cc/200?img=50",
    profile: {
      status: "Active user",
      age: 35,
      ethnicity: "Caucasian",
      sexuality: "Straight",
      gender: "Male",
      eyes: "Hazel",
      hair: "Brown",
      body: "Muscular",
      hairLength: "Short",
    },
  },
];

const contactData = [
  {
    id: 6,
    name: "Delphine Michael",
    lastMessage: "Hi friend I'm trying to reach...",
    timestamp: "about 3 year ago",
    avatar: "/assets/user.png?height=40&width=40",
  },
];

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
  avatar: string;
}

export default function ChatPage() {
  const isLaptop = useLaptop();
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState(chatData[0]);
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleSelectChat = (chat: Chat) => {
    if (isLaptop) {
      const fullChat = chatData.find((c) => c.id === chat.id);
      if (fullChat) {
        setSelectedChat(fullChat);
      }
    } else {
      // On mobile, navigate to /chat/[chatId]
      router.push(`/dashboard/chat/${selectedChat?.id}`);
    }
  };

  return (
    <>
      <div className="relative">
        <div
          className="hidden lg:flex flex-1 relative"
          style={{
            height: "calc(100dvh - 125px)",
          }}
        >
          <ChatSidebar
            chatData={chatData}
            contactData={contactData}
            selectedChat={selectedChat}
            onSelectChat={handleSelectChat}
          />
          {!selectedChat ? (
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

          {showProfile && (
            <ProfileSidebar user={selectedChat} onClose={handleCloseProfile} />
          )}
        </div>
      </div>

      <div className="lg:hidden flex w-full mb-12">
        <ChatSidebar
          chatData={chatData}
          contactData={contactData}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
        />
      </div>
    </>
  );
}
