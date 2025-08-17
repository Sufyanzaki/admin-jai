"use client";
import { NotificationCard } from "@/app/(client)/dashboard/notifications/_components/notification-card";
import {
  ImageRequestStatus,
  ImageRequestType,
  useAllImageRequests,
} from "../../_hooks/useAllImageRequests";
import { likesRecievedResponseData } from "../_api/getLikesRecived";

export default function RequestPage() {
  const { AllImagesRequests, AllImagesRequestsLoading, error, mutate } =
    useAllImageRequests(ImageRequestType.ACCEPTED, ImageRequestStatus.ACCEPTED);
  if (AllImagesRequestsLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="space-y-8">
      {AllImagesRequests && AllImagesRequests?.length <= 0 && <p>No data to show</p>}
      {AllImagesRequests && AllImagesRequests?.map((likeRec) => (
        <NotificationCard notification={likeRec} />
      ))}{" "}
    </div>
  );
}
