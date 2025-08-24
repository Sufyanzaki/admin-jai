"use client";
import { NotificationCard } from "@/app/(client)/dashboard/notifications/_components/notification-card";
import { ImageRequestStatus, ImageRequestType, useAllImageRequests } from "../../_hooks/useAllImageRequests";
import { useTranslation } from "react-i18next";


export default function TrashPage() {
  const { t } = useTranslation();
  const { AllImagesRequests, AllImagesRequestsLoading, error: imageTrash, mutate } =
    useAllImageRequests(ImageRequestType.ACCEPTED, ImageRequestStatus.DENIED);
  // const { likesRecieved, likesRecievedLoading, error } = useLikesRecieved(
  //   LikeStatus.DECLINED
  // );
  if (AllImagesRequestsLoading) {
    return <p>{t("Loading...")}</p>;
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
        {AllImagesRequests?.length === 0 && <p>{t("No Notifications found")}</p>}
        {AllImagesRequests?.map((req) => (
          <NotificationCard key={req.id} notification={req} />
        ))}
      </div>
    </div>

  );
}
