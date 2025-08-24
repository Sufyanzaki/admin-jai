"use client";
import {ImageRequestStatus, ImageRequestType, useAllImageRequests} from "../../_hooks/useAllImageRequests";
import {useTranslation} from "react-i18next";
import {ImageCard} from "@/app/(client)/dashboard/notifications/_components/Image-card";


export default function TrashPage() {
  const { t } = useTranslation();
  const { AllImagesRequests, AllImagesRequestsLoading } = useAllImageRequests(ImageRequestType.RECEIVED, ImageRequestStatus.DENIED);
  if (AllImagesRequestsLoading) {
    return <p>{t("Loading...")}</p>;
  }
  return (
    <div className="space-y-8">
      <div>
        {AllImagesRequests?.length === 0 &&  <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center max-w-md mx-auto">
                <h3 className="text-xl font-medium text-gray-500 mb-2">
                    {t("No notifications found")}
                </h3>
                <p className="text-gray-400">
                    {t("Check back later for new notifications")}.
                </p>
            </div>
        </div>}
        {AllImagesRequests?.map((req) => (
          <ImageCard key={req.id} notification={req} />
        ))}
      </div>
    </div>

  );
}
