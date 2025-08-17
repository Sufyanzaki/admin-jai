"use client";
import { NotificationCard } from "@/app/(client)/dashboard/notifications/_components/notification-card";
import { LikeStatus, useLikesRecieved } from "../_hooks/useLikesRecieved";
import { likesRecievedResponseData } from "../_api/getLikesRecived";
import { ImageRequestStatus, ImageRequestType, useAllImageRequests } from "../../_hooks/useAllImageRequests";


export default function TrashPage() {
  const { AllImagesRequests, AllImagesRequestsLoading, error: imageTrash, mutate } =
    useAllImageRequests(ImageRequestType.ACCEPTED, ImageRequestStatus.DECLINED);
  // const { likesRecieved, likesRecievedLoading, error } = useLikesRecieved(
  //   LikeStatus.DECLINED
  // );
  if (AllImagesRequestsLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="space-y-8">
      {/* Likes */}
      {/* <div>
        {likesRecieved?.length === 0 && <p>No data to show</p>}
        {likesRecieved?.map((likeRec) => (
          <NotificationCard key={likeRec.id} notification={likeRec} />
        ))}
      </div> */}

      {/* Images */}
      <div>
        {/* <h2>Your Declined Image Requests</h2> */}
        {AllImagesRequests?.length === 0 && <p>No data to show</p>}
        {AllImagesRequests?.map((req) => (
          <NotificationCard key={req.id} notification={req} />
        ))}
      </div>
    </div>

  );
}
