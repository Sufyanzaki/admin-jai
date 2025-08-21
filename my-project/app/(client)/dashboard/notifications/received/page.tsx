"use client";

import { NotificationCard } from "@/app/(client)/dashboard/notifications/_components/notification-card";
import { LikeStatus, useLikesReceived } from "../_hooks/useLikesReceived";

export default function ReceivedPage() {
  const { likesReceived, likesReceivedLoading, error } = useLikesReceived(
    LikeStatus.PENDING
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
      {likesReceived && likesReceived.length <= 0 && <p>No notification to show</p>}

      {likesReceived && likesReceived.map((likeRec, index) => (
        <NotificationCard notification={likeRec} key={index} />
      ))}
    </div>
  );
}
