"use client";
import { Button } from "@/components/client/ux/button";
import { Input } from "@/components/client/ux/input";
import {
  Send,
  MoreVertical,
} from "lucide-react";
import ImageWrapper from "@/components/client/image-wrapper";
import { useState } from "react";
import {EmojiPopover} from "@/components/client/emoji-popover";
import FileUploadClip from "@/components/client/file-upload-clip";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
  avatar: string;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

interface ChatBoxProps {
  selectedChat: Chat;
  onProfileClick: () => void;
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

export function ChatBox({ selectedChat, onProfileClick }: ChatBoxProps) {
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col relative">
        <div className="px-4 bg-white py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ImageWrapper
                src={selectedChat.avatar || "/user.png"}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-[5px] object-cover cursor-pointer hover:opacity-80 transition-opacity"
                onClick={onProfileClick}
              />
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedChat.name}
              </h2>
            </div>
            <Button
              onClick={onProfileClick}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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

        <div className="p-4 bg-white">
          <div className="flex items-center w-full gap-3">
            <EmojiPopover
              onEmojiSelect={() => {}}
            />
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
    </>
  );
}
