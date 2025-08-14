"use client";
import {Button} from "@/components/client/ux/button";
import {Input} from "@/components/client/ux/input";
import {ArrowLeft, MoreVertical, Send} from "lucide-react";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import ImageWrapper from "@/components/client/image-wrapper";
import {EmojiPopover} from "@/components/client/emoji-popover";
import FileUploadClip from "@/components/client/file-upload-clip";
import {useChatDetails} from "@/app/(client)/dashboard/chat/_hooks/useChatDetails";
import Preloader from "@/components/shared/Preloader";
import {useSendMessage} from "@/app/(client)/dashboard/chat/_hooks/useSendMessage";
import {formatDistanceToNow} from "date-fns";
import {useSession} from "next-auth/react";
import {MessageListener} from "@/client-utils/MessageListener";

export default function ChatBoxPage() {
  const { chatDetails, chatLoading, chatMutate } = useChatDetails();
  const { sending, sendMessageAction } = useSendMessage();
  const router = useRouter();
  const [messageInput, setMessageInput] = useState("");

  const {data:session} = useSession();

  const userId = session?.user?.id ? Number(session?.user?.id) : undefined;

  const handleSendMessage = async () => {
    const trimmedMessage = messageInput.trim();
    if (!trimmedMessage) return;
    await sendMessageAction({ content: trimmedMessage });
    setMessageInput("");
  };

  const goBack = () => {
    router.push("/dashboard/chat");
  };

  if (chatLoading) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">Loading chat...</p>
        </div>
    );
  }

  const chat = chatDetails?.data.messages;

  const senderDetails = (chat ?? []).filter(item => item.senderId !== userId)[0];
  const otherParticipant = senderDetails?.sender;

  return (
      <div className="relative">
        <MessageListener

            onMessage={(message) => {
              chatMutate((prev) => {
                  if (!prev) return {
                      messages: 1,
                      data: { messages: [message] },
                      status: "success"
                  };
                  return {
                      ...prev,
                      messages: prev.messages + 1,
                      data: {
                          messages : [...prev.data.messages, message]
                      }
                  };
              }, false).finally();
            }}

        />
        <div
            className="flex-1 flex flex-col relative"
            style={{
              height: "calc(100dvh - 70px)",
            }}
        >
          <div className="px-4 bg-white py-3 border-b border-gray-200">
            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ArrowLeft
                    className="text-app-gray cursor-pointer"
                    onClick={goBack}
                />
                <ImageWrapper
                    src={"https://i.pravatar.cc/200?img=10"}
                    alt={otherParticipant?.firstName || "Chat participant"}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <h2 className="text-lg font-semibold text-gray-900">
                  {otherParticipant?.firstName || "Chat"}
                </h2>
              </div>
              <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            {(chat ?? []).length > 0 ? (
                [...chat ?? []].map((message) => {
                  const currentUser = message.senderId === userId;
                  return (
                      <div
                          key={message.id}
                          className={`flex ${
                              currentUser ? "justify-end" : "justify-start"
                          }`}
                      >
                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-[5px] ${
                                currentUser
                                    ? "bg-[#1975D2] text-white"
                                    : "text-gray-900 bg-[#F7F7F7]"
                            }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                              className={`text-xs mt-1 ${
                                  currentUser
                                      ? "text-blue-100"
                                      : "text-gray-500"
                              }`}
                          >
                            {formatDistanceToNow(new Date(message.createdAt), {
                              addSuffix: true
                            })}
                          </p>
                        </div>
                      </div>
                  )
                })
            ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No messages yet</p>
                </div>
            )}
          </div>

          {/* Input area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center w-full gap-3">
              <EmojiPopover onEmojiSelect={() => console.log("selected")} />
              <FileUploadClip
                  onFileSelect={(file) => console.log("Selected file:", file)}
                  accept="image/*"
                  multiple={false}
              />
              <div className="w-full">
                <Input
                    value={messageInput}
                    className="h-11"
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage().finally();
                      }
                    }}
                    placeholder="Type your message..."
                    disabled={sending}
                />
              </div>
              <Button
                  onClick={handleSendMessage}
                  size="sm"
                  variant="theme"
                  className="h-9 w-9 p-0"
                  disabled={!messageInput.trim() || sending}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
}

//<div
//         className={`absolute top-0 right-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out
//       ${
//         showProfile
//           ? "translate-x-0 "
//           : "translate-x-1 w-0 overflow-hidden"
//       }`}
//       >
//         <ProfileSidebar user={selectedChat} onClose={handleCloseProfile} />
//       </div>