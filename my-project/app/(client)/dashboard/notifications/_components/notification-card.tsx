"use client";

import { MemberProfile } from "@/app/shared-types/member";
import ImageWrapper from "@/components/client/image-wrapper";
import { Button } from "@/components/client/ux/button";
import { Mail, ShieldCheck, Star } from "lucide-react";
import { useBlockUser } from "../../_hooks/useBlockUser";
import { likesRecievedResponseData } from "../_api/getLikesRecived";
import { useLikeResponse } from "../_hooks/useLikeResponse";
import { useRouter } from "next/navigation";
import { formatDate } from "date-fns";
import { useSession } from "next-auth/react";

export type Notification = {
  id: number;
  senderId: number;
  receiverId: number;
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "REJECTED" | "DENIED";  // adjust if you have more statuses
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  sender?: MemberProfile;
  receiver?: MemberProfile;
};

type NotificationCardProps = {
  notification: Notification;
};

export function NotificationCard({ notification }: NotificationCardProps) {
  const router = useRouter();
  const {data: session} = useSession()
  const { trigger: blockUser, loading: blockLoading } = useBlockUser();
  const { trigger, loading, error } = useLikeResponse();

  const handleAccept = () => {
    const action = "ACCEPTED";
    trigger(action, Number(notification?.id));
  };

  const handleDecline = () => {
    const action = "DECLINED";
    trigger(action, Number(notification?.id));
  };

  const handleViewProfile = () => {
    router.push(`/dashboard/search/${notification?.sender?.id}`)
  }

  const handleReport = () => {
    blockUser(Number(notification?.sender && notification?.sender.id)); // cast to number here
  };

  return (
    <div className="w-full rounded-[5px] bg-white border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 px-4 py-3 gap-2">
        <div className="">
          {notification?.sender && notification?.status !== "ACCEPTED" && notification?.sender?.id !== session?.user?.id ?
            <h3 className="font-medium text-sm sm:text-base">

              You received a like from {notification?.sender?.firstName}{" "}
              {notification?.sender?.lastName}
            </h3> : notification?.receiver ? <h3 className="font-medium text-sm sm:text-base">

              You sent a like to {notification?.receiver?.firstName}{" "}
              {notification?.receiver?.lastName}
            </h3> : notification?.sender && notification?.status === "ACCEPTED" &&
            <h3 className="font-medium text-sm sm:text-base">

              You accepted a like from {notification?.sender?.firstName}{" "}
              {notification?.sender?.lastName}
            </h3>}

        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>
            {notification?.updatedAt
              ? formatDate(notification?.updatedAt, "dd-mm-yyyy")
              : formatDate(notification?.createdAt, "dd-mm-yyyy")}
          </span>
          {/* {isStarred && (
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          )} */}
        </div>
      </div>

      <div className="space-y-4 px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-shrink-0 self-center sm:self-start">
            {notification?.sender ? <ImageWrapper
              src={notification?.sender?.image || "/placeholder.svg"}
              alt={notification?.sender?.firstName}
              className="w-24 h-24 sm:w-32 md:w-40 sm:h-32 md:h-40 rounded-[5px] object-cover"
            /> : notification?.receiver && <ImageWrapper
              src={notification?.receiver?.image || "/placeholder.svg"}
              alt={notification?.receiver?.firstName}
              className="w-24 h-24 sm:w-32 md:w-40 sm:h-32 md:h-40 rounded-[5px] object-cover"
            />}

          </div>

          <div className="flex-1 space-y-4">
            <div className="flex flex-col justify-between sm:flex-row sm:justify-between">
              <div className="space-y-2 sm:max-w-[70%]">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg sm:text-xl font-semibold">
                    {notification?.sender?.firstName}
                  </h4>
                  {(notification?.sender?.isPremium || notification?.receiver?.isPremium) && (
                    <ShieldCheck className="w-4 h-4 text-app-blue" />
                  )}
                </div>
                <div
                  className={`flex w-3 h-3 ${(notification?.sender?.isOnline || notification?.receiver?.isOnline) ? "bg-app-green" : "bg-app-red"
                    } rounded-[5px] border-2 border-white`}
                ></div>
                {/* <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  {from.age} Years, {from.height} | {from.languages.join(", ")},{" "}
                  {from.religion} | {from.profession}
                </p> */}

                {/* <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-app-blue mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{message}</p>
                </div> */}

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                  <Button
                    onClick={handleViewProfile}
                    variant="outline"
                    size="sm"
                    className="px-4 sm:px-6 w-full sm:w-auto"
                  >
                    View my Profile
                  </Button>
                  <Button
                    onClick={handleReport}
                    variant="outline"
                    size="sm"
                    className="px-4 sm:px-6 w-full sm:w-auto"
                  >
                    {blockLoading ? "Reporting..." : "Report This Profile"}
                  </Button>
                </div>
              </div>
              {notification?.sender && notification?.status === "PENDING" && notification?.sender?.id !== session?.user?.id ?
                <div className="sm:text-right space-y-2">
                  <p className="text-xs">She invited you to Connect</p>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      onClick={handleAccept}
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white px-4 grow sm:grow-0"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={handleDecline}
                      size="sm"
                      variant="outline"
                      className="px-4 grow sm:grow-0"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
                : notification?.sender && notification?.status === "DECLINED" &&
                <div className="sm:text-right space-y-2">
                  <p className="text-xs">She invited you to Connect</p>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      onClick={handleAccept}
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white px-4 grow sm:grow-0"
                    >
                      Accept
                    </Button>
                  </div>
                </div>}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
