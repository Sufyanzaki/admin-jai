"use client";
import { Button } from "@/components/client/ux/button";
import { Input } from "@/components/client/ux/input";
import { ArrowLeft, MoreVertical, Send, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ImageWrapper from "@/components/client/image-wrapper";
import { EmojiPopover } from "@/components/client/emoji-popover";
import FileUploadClip from "@/components/client/file-upload-clip";
import { useChatDetails } from "@/app/(client)/dashboard/chat/_hooks/useChatDetails";
import Preloader from "@/components/shared/Preloader";
import { useSendMessage } from "@/app/(client)/dashboard/chat/_hooks/useSendMessage";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { MessageListener } from "@/client-utils/MessageListener";
import { imageUpload } from "@/admin-utils/utils/imageUpload";
import { ProfileSidebar } from "../_components/profile-sidebar";

export default function ChatBoxPage() {
    const { chatDetails, chatLoading, chatMutate } = useChatDetails({});
    const { sending, sendMessageAction } = useSendMessage();
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [messageInput, setMessageInput] = useState("");
    const [attachments, setAttachments] = useState<string[]>([]);

    const { data: session } = useSession();
    const userId = session?.user?.id ? Number(session?.user?.id) : undefined;

    const handleSendMessage = async () => {
        const trimmedMessage = messageInput.trim();
        if (!trimmedMessage && attachments.length === 0) return;

        const finalContent = [trimmedMessage, ...attachments].filter(Boolean).join("\n");

        await sendMessageAction({
            content: finalContent
        });

        setMessageInput("");
        setAttachments([]);
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
    const senderDetails = (chat ?? []).find(item => item.senderId !== userId);
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
                                messages: [...prev.data.messages, message]
                            }
                        };
                    }, false).finally();
                }}
            />
            <div className="flex-1 flex flex-col relative" style={{ height: "calc(100dvh - 70px)" }}>
                {/* Header */}
                <div className="px-4 bg-white py-3 border-b border-gray-200">
                    <div className="py-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ArrowLeft className="text-app-gray cursor-pointer" onClick={goBack} />
                            <ImageWrapper
                                src={otherParticipant?.image ? otherParticipant.image : "https://i.pravatar.cc/200?img=10"}
                                alt={otherParticipant?.firstName || "Chat participant"}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <h2 className="text-lg font-semibold text-gray-900">
                                {otherParticipant?.firstName || "Chat"}
                            </h2>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowProfile(true)}>
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                    {(chat ?? []).length > 0 ? (
                        [...chat ?? []].reverse().map((message) => {
                            const currentUser = message.senderId === userId;
                            return (
                                <div
                                    key={message.id}
                                    className={`flex sm:overflow-x-hidden ${currentUser ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-[5px] ${
                                            currentUser
                                                ? "bg-[#1975D2] text-white"
                                                : "text-gray-900 bg-[#F7F7F7]"
                                        }`}
                                    >
                                        {message.content && (
                                            <p className="text-sm whitespace-pre-wrap">
                                                {message.content}
                                            </p>
                                        )}

                                        {(() => {
                                            const imageRegex = /(https?:\/\/[^\s]+?\.(png|jpg|jpeg|gif|webp))/i;
                                            const match = message.content?.match(imageRegex);
                                            if (match) {
                                                return (
                                                    <img
                                                        src={match[0]}
                                                        alt="Attached"
                                                        className="mt-2 rounded-lg max-w-full border border-gray-200"
                                                    />
                                                );
                                            }
                                            return null;
                                        })()}

                                        <p
                                            className={`text-xs mt-1 ${
                                                currentUser ? "text-blue-100" : "text-gray-500"
                                            }`}
                                        >
                                            {formatDistanceToNow(new Date(message.createdAt), {
                                                addSuffix: true,
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

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-200 space-y-2">
                    {/* Attachment Preview */}
                    {attachments.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            {attachments.map((fileUrl, idx) => (
                                <div key={idx} className="relative">
                                    {fileUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                        <img
                                            src={fileUrl}
                                            alt={`attachment-${idx}`}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded text-xs text-gray-600">
                                            File
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setAttachments((prev) => prev.filter((_, i) => i !== idx))
                                        }
                                        className="absolute top-0 right-0 bg-black/50 text-white rounded-full p-1"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {uploading && <Preloader size="sm" />}

                    <div className="flex items-center w-full gap-3">
                        <EmojiPopover onEmojiSelect={(emoji) => setMessageInput((prev) => prev + emoji)} />
                        <FileUploadClip
                            onFileSelect={async (file) => {
                                if (!file) return;
                                setUploading(true);
                                const res = await imageUpload(file);
                                setAttachments((prev) => [...prev, res])
                                setUploading(false);
                            }}
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
                            disabled={sending}
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </div>
                    <div
                        className={`absolute top-0 right-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out w-fit
                            ${showProfile ? "translate-x-0" : "translate-x-full"}`}
                    >
                        {otherParticipant && (
                            <ProfileSidebar
                                user={otherParticipant}
                                onClose={() => setShowProfile(false)}
                            />
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}