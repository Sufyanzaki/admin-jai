'use client'
import { NotificationCard } from "@/app/(client)/dashboard/notifications/_components/notification-card";
import { useLikesSent } from "../_hooks/useLikesSent";
import { likesSentResponseData } from "../_api/getLikesSent";


export default function SentPage() {
  const { likesSent, likesSentLoading, error } = useLikesSent();
  if (likesSentLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>error getting notifications...
      <p>{error?.message}</p>
    </p>;
  }
  return (
    <div className="space-y-8">
      {likesSent && likesSent?.length <= 0 && <p>No notification to show</p>}

      {likesSent && likesSent?.map((likeRec: likesSentResponseData) => (
        <NotificationCard notification={likeRec} />
      ))}
    </div>
  );
}
