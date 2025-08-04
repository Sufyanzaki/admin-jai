"use client";
import { Button } from "@/components/client/ux/button";
import { Input } from "@/components/client/ux/input";
import {
  Send,
  MoreVertical,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProfileSidebar } from "../_components/profile-sidebar";
import ImageWrapper from "@/components/client/image-wrapper";
import {EmojiPopover} from "@/components/client/emoji-popover";
import FileUploadClip from "@/components/client/file-upload-clip";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
  avatar: string;
  profile: Profile;
}

interface Profile {
  status: string;
  age: number;
  ethnicity: string;
  sexuality: string;
  gender: string;
  eyes: string;
  hair: string;
  body: string;
  hairLength: string;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

const messages: Message[] = [
  {
    id: 1,
    text: "Then this whole thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
    sender: "other",
    timestamp: "about 3 year ago",
  },
  {
    id: 2,
    text: "And then we decided to move back our first location because, you know, everything was already setup so that&apos;s the third time.",
    sender: "other",
    timestamp: "about 3 year ago",
  },
  {
    id: 3,
    text: "Oh I see! I'm really sorry you had to go through all that it must have been painful at the time.",
    sender: "user",
    timestamp: "about 3 year ago",
  },
  {
    id: 4,
    text: "hones never it was good catching up with you.",
    sender: "other",
    timestamp: "about 3 year ago",
  },
  {
    id: 5,
    text: "Yeah same, I'll see you in next week so we can grab a coffee, tomorrow?",
    sender: "user",
    timestamp: "about 3 year ago",
  },
  {
    id: 6,
    text: "3 Sure, man see you next week!",
    sender: "other",
    timestamp: "about 3 year ago",
  },
];

const selectedChat: Chat = {
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
};
export default function ChatBoxPage() {
  const router = useRouter();
  const [messageInput, setMessageInput] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  const goBack = () => {
    router.back(); // equivalent to navigate(-1)
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    console.log("object");
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  return (
    <div className="relative">
      <div
        className="flex-1 flex flex-col relative "
        style={{
          height: "calc(100dvh - 70px)",
        }}
      >
        {/* Chat header */}
        <div className="px-4 bg-white py-3 border-b border-gray-200">
          <div className="py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ArrowLeft className="text-app-gray" onClick={goBack} />
              <ImageWrapper
                src={selectedChat.avatar || "/user.png"}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                // onClick={onProfileClick}
              />
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedChat.name}
              </h2>
            </div>
            <Button
              onClick={handleProfileClick}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages container (scrollable) */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-[5px] ${
                  message.sender === "user"
                    ? "bg-[#1975D2] text-white"
                    : "text-gray-900 bg-[#F7F7F7]"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input area (fixed at bottom) */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center w-full gap-3">
            <EmojiPopover onEmojiSelect={() => console.log("selected")} />

            <FileUploadClip
              onFileSelect={(file) => {
                console.log("Selected file:", file);
              }}
              accept="image/*"
              multiple={false}
            />
            <div className="w-full">
              <Input
                value={messageInput}
                className="h-11"
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
              />
            </div>
            <Button
              onClick={handleSendMessage}
              size="sm"
              variant={"theme"}
              className="h-9 w-9 p-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-0 right-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out 
      ${
        showProfile
          ? "translate-x-0 w-screen"
          : "translate-x-full w-0 overflow-hidden"
      }`}
      >
        <ProfileSidebar user={selectedChat} onClose={handleCloseProfile} />
      </div>
    </div>
  );
}
