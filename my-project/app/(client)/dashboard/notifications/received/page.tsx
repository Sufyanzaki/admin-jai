"use client";

import { NotificationCard } from "@/app/(client)/dashboard/notifications/_components/notification-card";
import { LikeStatus, useLikesRecieved } from "../_hooks/useLikesRecieved";
import { likesRecievedResponseData } from "../_api/getLikesRecived";

export default function ReceivedPage() {
  const { likesRecieved, likesRecievedLoading, error } = useLikesRecieved(
    LikeStatus.PENDING
  );
  if (likesRecievedLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>error getting notifications...
      <p>{error?.message}</p>
    </p>;
  }
  return (
    <div className="space-y-8">
      {likesRecieved && likesRecieved?.length <= 0 && <p>No notification to show</p>}

      {likesRecieved && likesRecieved?.map((likeRec: likesRecievedResponseData) => (
        <NotificationCard notification={likeRec} />
      ))}
    </div>
  );
}
