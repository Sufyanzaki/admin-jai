"use client";

import { Switch } from "@/components/client/ux/switch";
import {
  BookmarkIcon,
  HexagonUser,
  MessageIcon,
  UsersIcon,
} from "@/lib/icons";
import usePhotoPrivacyForm from "@/app/(client)/dashboard/settings/photo/_hooks/usePhotoForm";
import Preloader from "@/components/shared/Preloader";

const photoSettings = [
  {
    id: "onlyMembersWithPhotoCanSee",
    title: "Only members with photo can see my photo",
    description: "Your profile photo is visible only to members who have uploaded theirs.",
    icon: BookmarkIcon,
  },
  {
    id: "onlyVipCanSee",
    title: "Only VIP members can see my photo",
    description: "Your photo is only visible to members with VIP status.",
    icon: UsersIcon,
  },
  {
    id: "blurForFreeMembers",
    title: "Blur photo for free members",
    description: "Free members will see a blurred version of your photo.",
    icon: MessageIcon,
  },
  {
    id: "onRequestOnly",
    title: "Only when a member asks for it",
    description: "Your photo will only be visible when a member sends a request.",
    icon: HexagonUser,
  },
];

export function PhotoSettings() {
  const {
    handleSubmit,
    onSubmit,
    isLoading,
    isDirty,
    toggleSetting,
    watch,
    reset,
    getValues,
      isFetching
  } = usePhotoPrivacyForm();

  const currentValues = watch();

  if(isFetching){
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader/>
          <p className="text-sm">Loading Blogs...</p>
        </div>
    )
  }

  return (
      <form onSubmit={handleSubmit(v=>onSubmit(v))} className="flex flex-col min-h-screen w-full -mt-6 lg:-mt-4">
        <div className="space-y-3">
          {photoSettings.map((setting, i) => (
              <div
                  key={i}
                  className="flex items-center justify-between py-5 border-b border-gray-200 last:border-b-0"
              >
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
                    checked={currentValues[setting.id as keyof typeof currentValues]}
                    onCheckedChange={() => toggleSetting(setting.id as keyof typeof currentValues)}
                    className="data-[state=checked]:bg-app-pink"
                    disabled={isLoading}
                />
              </div>
          ))}
        </div>

        {isDirty && (
            <div className="flex justify-end gap-3 mt-6">
              <button
                  type="button"
                  onClick={() => reset()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  disabled={isLoading}
              >
                Cancel
              </button>
              <button
                  type="button"
                  onClick={() => onSubmit(getValues())}
                  className="px-4 py-2 text-sm font-medium text-white bg-app-pink rounded-md hover:bg-app-pink-dark"
                  disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
        )}
      </form>
  );
}