"use client";
import { Button } from "@/components/client/ux/button";
import { X } from "lucide-react";
import ImageWrapper from "@/components/client/image-wrapper";
import {MemberProfile} from "@/app/shared-types/member";

interface ProfileSidebarProps {
  user: MemberProfile;
  onClose: () => void;
}

export function ProfileSidebar({ user, onClose }: ProfileSidebarProps) {
  const basicInfo = [
    { label: "Username", value: user.username },
    { label: "Email", value: user.email },
    { label: "Age", value: user.age },
    { label: "Gender", value: user.gender },
    { label: "Origin", value: user.origin },
    { label: "Relationship Status", value: user.relationshipStatus },
    { label: "Religion", value: user.religion },
    { label: "Message Count", value: user.messageCount },
    { label: "Premium", value: user.isPremium ? "Yes" : "No" },
  ];

  return (
      <div className="w-screen md:w-80 bg-white border-l border-gray-200 flex flex-col">
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
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <ImageWrapper
                  src={user.image || "/placeholder.svg"}
                  alt={user.firstName || "Profile"}
                  className="w-24 h-24 border-gray-200 rounded-full object-cover mx-auto"
              />
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-app-green rounded-full border-2 border-white"></div>
            </div>
            <h3 className="text-base font-semibold mb-1">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm font-medium text-gray-500">{user.shortDescription}</p>
          </div>

          <div className="space-y-2 mb-6">
            {basicInfo.map((item, idx) => (
                <div
                    key={idx}
                    className="grid grid-cols-3 py-1 border-b border-gray-100"
                >
                  <span className="text-sm font-medium text-black">{item.label}</span>
                  <span className="text-sm font-medium text-black text-center">:</span>
                  <span className="text-sm break-words">{item.value ?? "N/A"}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}
