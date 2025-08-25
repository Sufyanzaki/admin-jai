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
import {useTranslation} from "react-i18next";

const photoSettings = (t: any) => [
  {
    id: "onlyMembersWithPhotoCanSee",
    title: t("Only members with photo can see my photo"),
    description: t("Your profile photo is visible only to members who have uploaded theirs."),
    icon: BookmarkIcon,
  },
  {
    id: "onlyVipCanSee",
    title: t("Only VIP members can see my photo"),
    description: t("Your photo is only visible to members with VIP status."),
    icon: UsersIcon,
  },
  {
    id: "blurForFreeMembers",
    title: t("Blur photo for free members"),
    description: t("Free members will see a blurred version of your photo."),
    icon: MessageIcon,
  },
  {
    id: "onRequestOnly",
    title: t("Only when a member asks for it"),
    description: t("Your photo will only be visible when a member sends a request."),
    icon: HexagonUser,
  },
];

export function PhotoSettings() {
  const { t } = useTranslation();
  const {
    handleSubmit,
    onSubmit,
    isLoading,
    watch,
    getValues,
    isFetching,
    setValue,
  } = usePhotoPrivacyForm();

  const currentValues = watch();
  const settings = photoSettings(t);

  // Handle exclusive toggle - only one setting can be active at a time
  const handleExclusiveToggle = (settingId: string) => {
    const isCurrentlyActive = currentValues[settingId as keyof typeof currentValues];
    
    // First, turn off all settings
    settings.forEach(setting => {
      setValue(setting.id as keyof typeof currentValues, false);
    });
    
    // Then turn on the clicked one (unless it was already active, in which case turn it off)
    if (!isCurrentlyActive) {
      setValue(settingId as keyof typeof currentValues, true);
    }
  };

  if (isFetching) {
    return (
        <div className="flex items-center flex-col justify-center h-screen">
          <Preloader />
          <p className="text-sm">{t("Loading Settings...")}</p>
        </div>
    );
  }

  return (
      <form
          onSubmit={handleSubmit((v) => onSubmit(v))}
          className="flex flex-col min-h-screen w-full -mt-6 lg:-mt-4"
      >
        <div className="space-y-3">
          {settings.map((setting, i) => (
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
                    onCheckedChange={() => handleExclusiveToggle(setting.id)}
                    className="data-[state=checked]:bg-app-pink"
                    disabled={isLoading}
                />
              </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
              <button
                  type="button"
                  onClick={() => onSubmit(getValues())}
                  className="px-4 py-2 text-sm font-medium text-white bg-app-pink rounded-md hover:bg-app-pink-dark"
                  disabled={isLoading}
              >
                {isLoading ? t("Saving...") : t("Save Changes")}
              </button>
            </div>
      </form>
  );
}