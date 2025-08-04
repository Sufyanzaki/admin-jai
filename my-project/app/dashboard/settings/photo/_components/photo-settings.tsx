"use client";

import { Switch } from "@/components/client/ux/switch";
import { useState } from "react";
import {
  BookmarkIcon,
  HexagonUser,
  MessageIcon,
  UsersIcon,
} from "@/lib/icons";

const photoSettings = [
  {
    id: "photo-members-only",
    title: "Only members with photo can see my photo",
    description: "Your profile photo is visible only to members who have uploaded theirs.",
    icon: BookmarkIcon,
    defaultEnabled: true,
  },
  {
    id: "photo-vip-only",
    title: "Only VIP members can see my photo",
    description: "Your photo is only visible to members with VIP status.",
    icon: UsersIcon,
    defaultEnabled: false,
  },
  {
    id: "blur-photo-free",
    title: "Blur photo for free members",
    description: "Free members will see a blurred version of your photo.",
    icon: MessageIcon,
    defaultEnabled: true,
  },
  {
    id: "photo-on-request",
    title: "Only when a member asks for it",
    description: "Your photo will only be visible when a member sends a request.",
    icon: HexagonUser,
    defaultEnabled: false,
  },
];

export function PhotoSettings() {
  const [settings, setSettings] = useState(
    photoSettings.reduce((acc, setting) => {
      acc[setting.id] = setting.defaultEnabled;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleToggle = (settingId: string) => {
    setSettings((prev) => ({
      ...prev,
      [settingId]: !prev[settingId],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen w-full -mt-6 lg:-mt-4">
      {/* Settings */}
      <div className="space-y-3">
        {photoSettings.map((setting,i) => (
          <div key={i} className="flex items-center justify-between py-5 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center gap-3">
              <setting.icon />
              <div>
                <h3 className="font-bold text-base text-gray-900">
                  {setting.title}
                </h3>
                <p className="text-sm font-normal text-gray-600">
                  {setting.description}
                </p>
              </div>
            </div>
            <Switch
              checked={settings[setting.id]}
              onCheckedChange={() => handleToggle(setting.id)}
              className="data-[state=checked]:bg-app-pink"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
