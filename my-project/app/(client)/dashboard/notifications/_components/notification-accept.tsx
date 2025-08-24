"use client";

import ImageWrapper from "@/components/client/image-wrapper";
import {Button} from "@/components/client/ux/button";
import {Mail, ShieldCheck} from "lucide-react";
import {useBlockUser} from "../../_hooks/useBlockUser";
import {useRouter} from "next/navigation";
import {formatDate} from "date-fns";
import {RequestDto} from "@/app/(client)/dashboard/notifications/_types/notification";
import {useTranslation} from "react-i18next";
import {Badge} from "@/components/client/ux/badge";

type NotificationCardProps = {
    notification: RequestDto;
};

export function NotificationAccept({ notification }: NotificationCardProps) {

    const router = useRouter();
    const { t } = useTranslation();
    const { trigger: blockUser, loading: blockLoading } = useBlockUser();

        const handleViewProfile = () => {
        router.push(`/dashboard/search/${notification.sender.id}`)
    }

    const handleReport = () => {
        blockUser(Number(notification.sender && notification.sender.id)).finally();
    };

    return (
        <div className="w-full rounded-[5px] bg-white border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 px-4 py-3 gap-2">
                <div className="">
                    <h3 className="font-medium text-sm sm:text-base">
                        {t("You accepted a like from ")} {notification.sender.firstName}{" "}
                        {notification.sender.lastName}
                    </h3>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>
            {notification.updatedAt
                ? formatDate(notification.updatedAt, "dd-mm-yyyy")
                : formatDate(notification.createdAt, "dd-mm-yyyy")}
          </span>
                </div>
            </div>

            <div className="space-y-4 px-4 py-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-shrink-0 self-center sm:self-start">
                        {notification.sender && (
                            <ImageWrapper
                                src={notification.sender.image || "/placeholder.svg"}
                                alt={notification.sender.firstName}
                                className="w-24 h-24 sm:w-32 md:w-40 sm:h-32 md:h-40 rounded-[5px] object-cover"
                            />
                        )}
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="flex flex-col justify-between sm:flex-row sm:justify-between">
                            <div className="space-y-2 sm:max-w-[70%]">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-lg sm:text-xl font-semibold">
                                        {notification.sender.firstName} {" "} {notification.sender.lastName}
                                    </h4>
                                    {(notification.sender.isPremium || notification.sender.isPremium) && (
                                        <ShieldCheck className="w-4 h-4 text-app-blue" />
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center">
                                    <div className={`flex w-3 h-3 ${(notification.sender.isOnline) ? "bg-app-green" : "bg-app-red"} rounded-[5px] border-2 border-white`} />
                                    <Badge
                                        className={
                                            `px-2 rounded-[5px] ml-2 text-white ` +
                                            (notification.status === "ACCEPTED"
                                                ? "bg-green-500"
                                                : notification.status === "DECLINED"
                                                    ? "bg-red-500"
                                                    : notification.status === "PENDING"
                                                        ? "bg-yellow-500"
                                                        : "bg-app-blue")
                                        }
                                    >
                                        {notification.status}
                                    </Badge>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                                    {[
                                        { label: "Age", value: `${notification.sender.age} Years` },
                                        { label: "DOB", value: notification.sender.dob?.split("T")[0] },
                                        { label: "Religion", value: notification.sender.religion },
                                        { label: "Status", value: notification.sender.relationshipStatus },
                                        { label: "Gender", value: notification.sender.gender },
                                    ].map((item, index, arr) => (
                                        <span key={index}>
                      {item.label}: {item.value}
                                            {index < arr.length - 1 && " | "}
                    </span>
                                    ))}
                                </p>

                                <div className="flex items-start gap-2">
                                    <Mail className="w-4 h-4 text-app-blue mt-0.5 flex-shrink-0" />
                                    <p className="text-sm leading-relaxed">{notification.sender.email}</p>
                                </div>

                                <p className="text-sm leading-relaxed">{notification.sender.shortDescription}</p>

                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                                    <Button
                                        onClick={handleViewProfile}
                                        variant="outline"
                                        size="sm"
                                        className="px-4 sm:px-6 w-full sm:w-auto"
                                    >
                                        {t("View Profile")}
                                    </Button>
                                    <Button
                                        onClick={handleReport}
                                        variant="outline"
                                        size="sm"
                                        className="px-4 sm:px-6 w-full sm:w-auto"
                                    >
                                        {blockLoading ? t("Blocking..") : t("Block This Profile")}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
