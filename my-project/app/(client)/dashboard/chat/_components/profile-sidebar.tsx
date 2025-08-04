"use client";
import { Button } from "@/components/client/ux/button";
import { X } from "lucide-react";
import ImageWrapper from "@/components/client/image-wrapper";

interface UserProfile {
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

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
  avatar: string;
  profile: UserProfile;
}

interface ProfileSidebarProps {
  user: Chat;
  onClose: () => void;
}

export function ProfileSidebar({ user, onClose }: ProfileSidebarProps) {
  return (
    <div className="w-screen md:w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-3 border-b border-gray-200 min-h-[65px] flex justify-between items-center gap-3">
        <h2 className="text-base font-medium">Contact Info</h2>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Profile Content */}
      <div className="flex-1 px-8 py-4 overflow-y-scroll h-full">
        {/* Profile Photo and Basic Info */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4 ">
            <ImageWrapper
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-24 h-24 border-gray-200 rounded-full object-cover mx-auto"
            />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-app-green rounded-full border-2 border-white"></div>
          </div>
          <h3 className="text-base font-semibold mb-1">{user.name}</h3>
          <p className="text-sm font-medium text-gray-500">
            {user.profile.status}
          </p>
        </div>
        <div className="">
          <div className="space-y-2 mb-6">
            {[
              { label: "Age", value: user.profile.age },
              { label: "Ethnicity", value: user.profile.ethnicity },
              { label: "Sexuality", value: user.profile.sexuality },
              { label: "Gender", value: user.profile.gender },
                            { label: "Gender", value: user.profile.gender },
              { label: "Gender", value: user.profile.gender },

            ].map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 py-1 border-b border-gray-100"
              >
                <span className="text-sm font-medium text-black">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-black text-center">
                  :
                </span>
                <span className="text-sm">{item.value}</span>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">What do I look like?</h4>
            <div className="space-y-2">
              {[
                { label: "My Eyes", value: user.profile.eyes },
                { label: "My Hair", value: user.profile.hair },
                { label: "My Body", value: user.profile.body },
                { label: "Hair Length", value: user.profile.hairLength },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 py-1 border-b border-gray-100"
                >
                  <span className="text-sm font-medium text-black">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-black text-center">
                    :
                  </span>
                  <span className="text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
