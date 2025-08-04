"use client"

import {ChatSidebar} from "./chat-sidebar"
import {ChatBox} from "./chat-box"
import {ProfileSidebar} from "./profile-sidebar"
import {useState} from "react"

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
]

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
  avatar: string;
}

export function ChatInterface() {
  const [selectedChat, setSelectedChat] = useState(chatData[0])
  const [showProfile, setShowProfile] = useState(false)

  const handleProfileClick = () => {
    setShowProfile(true)
  }

  const handleCloseProfile = () => {
    setShowProfile(false)
  }

  const handleSelectChat = (chat: Chat) => {
  const fullChat = chatData.find(c => c.id === chat.id)
  if (fullChat) {
    setSelectedChat(fullChat)
  }
}

  return (
    <>
      <div className="flex flex-1 max-h-screen min-h-[86vh]">
        <ChatSidebar
          chatData={chatData}
          contactData={contactData}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
        />
        <ChatBox selectedChat={selectedChat} onProfileClick={handleProfileClick} />
        {showProfile && <ProfileSidebar user={selectedChat} onClose={handleCloseProfile} />}
      </div>
    </>
  )
}
