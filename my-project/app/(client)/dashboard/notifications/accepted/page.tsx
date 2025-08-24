"use client";

import { NotificationCard } from "@/app/(client)/dashboard/notifications/_components/notification-card";
import { LikeStatus, useLikesReceived } from "../_hooks/useLikesReceived";
import { useTranslation } from "react-i18next";

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
      {likesAccepted && likesAccepted.length <= 0 && <p>{t("No Notifications found")}</p>}
      {likesAccepted && likesAccepted?.map((likeRec, index) => (
        <NotificationCard notification={likeRec} key={index} />
      ))}
    </div>
  );
}
