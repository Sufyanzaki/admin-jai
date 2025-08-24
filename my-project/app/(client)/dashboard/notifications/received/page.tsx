"use client";

import {LikeStatus, useLikesReceived} from "../_hooks/useLikesReceived";
import {useTranslation} from "react-i18next";
import {NotificationReceived} from "@/app/(client)/dashboard/notifications/_components/notification-received";

export default function ReceivedPage() {
  const { t } = useTranslation();
  const { likesReceived, likesReceivedLoading, error } = useLikesReceived(
    LikeStatus.PENDING
  );
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
      {likesReceived && likesReceived.length <= 0 && <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto">
          <h3 className="text-xl font-medium text-gray-500 mb-2">
            {t("No notifications found")}
          </h3>
          <p className="text-gray-400">
            {t("Check back later for new notifications")}.
          </p>
        </div>
      </div>}

      {likesReceived && likesReceived.map((likeRec, index) => (
        <NotificationReceived notification={likeRec} key={index} />
      ))}
    </div>
  );
}
