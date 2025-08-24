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
      {likes && likes.length <= 0 && <p>{t("No Notifications found")}</p>}

      {likes && likes.map((likeRec, index) => (
        <NotificationCard notification={likeRec} key={index} />
      ))}
    </div>
  );
}
