"use client";

import {NotificationCard} from "@/app/(client)/dashboard/notifications/_components/notification-card";
import {LikeStatus, useLikesReceived} from "../_hooks/useLikesReceived";

export default function NotificationsPage() {
  const { likesReceived:likesAccepted , likesReceivedLoading, error } = useLikesReceived(
    LikeStatus.ACCEPTED
  );
  if (likesReceivedLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>error getting notifications...
      <p>{error?.message}</p>
    </p>;
  }

  return (
    <div className="space-y-8">
      {likesAccepted && likesAccepted.length <= 0 && <p>No data to show</p>}
      {likesAccepted && likesAccepted?.map((likeRec, index) => (
        <NotificationCard notification={likeRec} key={index} />
      ))}
    </div>
  );
}
