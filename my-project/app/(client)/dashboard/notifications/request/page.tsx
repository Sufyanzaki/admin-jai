"use client";
import { NotificationCard } from "@/app/(client)/dashboard/notifications/_components/notification-card";
import {
  ImageRequestStatus,
  ImageRequestType,
  useAllImageRequests,
} from "../../_hooks/useAllImageRequests";

const sampleNotification = {
  id: "1",
  type: "like" as const,
  from: {
    name: "Dora M",
    age: 39,
    height: "5.5",
    languages: ["Hindi"],
    religion: "Hindu",
    profession: "Finance Professional",
    image: "https://picsum.photos/seed/dora/200",
    isVerified: true,
    isOnline: true,
    lastSeen: "1d ago",
  },
  message:
    "Hi, it is nice connecting with you. I liked your profile and would like to take this forward.",
  timestamp: "Dec 30, 04:22 PM",
  isStarred: true,
};

export default function RequestPage() {
  const { AllImagesRequests, AllImagesRequestsLoading, error, mutate } =
    useAllImageRequests(ImageRequestType.RECIEVED, ImageRequestStatus.ACCEPTED);
      if (AllImagesRequestsLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="space-y-8">
      {AllImagesRequests?.map((likeRec: likesRecievedResponseData) => (
        <NotificationCard notification={likeRec} />
      ))}{" "}
    </div>
  );
}
