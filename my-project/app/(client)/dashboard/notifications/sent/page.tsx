'use client'
import {NotificationCard} from "@/app/(client)/dashboard/notifications/_components/notification-card";
import {useSentLikes} from "@/app/(client)/dashboard/notifications/sent/_hook/useSentLikes";


export default function SentPage() {
  const {likesLoading, likes, error } = useSentLikes();
  if (likesLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>error getting notifications...
      <p>{error?.message}</p>
    </p>;
  }
  return (
    <div className="space-y-8">
      {likes && likes.length <= 0 && <p>No notification to show</p>}

      {likes && likes.map((likeRec, index) => (
        <NotificationCard notification={likeRec} key={index} />
      ))}
    </div>
  );
}
