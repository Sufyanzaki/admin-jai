"use client";
import { useTranslation } from "react-i18next";
import { ImageRequestStatus, ImageRequestType, useAllImageRequests, } from "../../_hooks/useAllImageRequests";
import { ImageCard } from "@/app/(client)/dashboard/notifications/_components/Image-card";

export default function RequestPage() {
  const { t } = useTranslation();
  const { AllImagesRequests, AllImagesRequestsLoading } = useAllImageRequests(ImageRequestType.ACCEPTED, ImageRequestStatus.ACCEPTED);
  if (AllImagesRequestsLoading) {
    return <p>{t("Loading...")}</p>;
  }
  return (
    <div className="space-y-8">
      {AllImagesRequests && AllImagesRequests.length <= 0 && <p>{t("No data found")}</p>}
      {AllImagesRequests && AllImagesRequests.map((likeRec, index) => (
        <ImageCard notification={likeRec} key={index} />
      ))}
    </div>
  );
}
