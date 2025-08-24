'use client'
import { NotificationCard } from "@/app/(client)/dashboard/notifications/_components/notification-card";
import { useSentLikes } from "@/app/(client)/dashboard/notifications/sent/_hook/useSentLikes";
import { useTranslation } from "react-i18next";


export default function SentPage() {
  const { t } = useTranslation();
  const { likesLoading, likes, error } = useSentLikes();
  if (likesLoading) {
    return <p>{t("Loading...")}</p>;
  }
  if (error) {
    return <p>{t("error getting notifications...")}
      <p>{error?.message}</p>
    </p>;
  }
  return (
    <div className="space-y-8">
      {likes && likes.length <= 0 && <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto">
          <h3 className="text-xl font-medium text-gray-500 mb-2">
            {t("No notifications found")}
          </h3>
          <p className="text-gray-400">
            {t("Check back later for new notifications")}.
          </p>
        </div>
      </div>}

      {likes && likes.map((likeRec, index) => (
        <NotificationCard notification={likeRec} key={index} type="sent" />
      ))}
    </div>
  );
}
