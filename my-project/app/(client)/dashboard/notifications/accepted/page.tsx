"use client";

import { NotificationCard } from "@/app/(client)/dashboard/notifications/_components/notification-card";
import { LikeStatus, useLikesReceived } from "../_hooks/useLikesReceived";
import { useTranslation } from "react-i18next";
import {NotificationAccept} from "@/app/(client)/dashboard/notifications/_components/notification-accept";

export default function NotificationsPage() {
  const { t } = useTranslation();
  const { likesReceived: likesAccepted, likesReceivedLoading, error } = useLikesReceived(LikeStatus.ACCEPTED);
  if (likesReceivedLoading) {
    return <p>{t("Loading...")}</p>;
  }
  if (error) {
    return <p>{t("error getting notifications...")}
      <p>{error?.message}</p>
    </p>;
  }

  return (
    <div className="space-y-8">
      {likesAccepted && likesAccepted.length <= 0 && <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto">
          <h3 className="text-xl font-medium text-gray-500 mb-2">
            {t("No notifications found")}
          </h3>
          <p className="text-gray-400">
            {t("Check back later for new notifications")}.
          </p>
        </div>
      </div>}
      {likesAccepted && likesAccepted?.map((likeRec, index) => (
        <NotificationAccept notification={likeRec} key={index} />
      ))}
    </div>
  );
}
