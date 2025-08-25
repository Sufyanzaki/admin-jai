"use client";

import { MemberProfile } from "@/app/shared-types/member";
import ImageWrapper from "@/components/client/image-wrapper";
import { Button } from "@/components/client/ux/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { useSendLike } from "../_hooks/useSendLike";
import { useUnblockUser } from "../settings/blocked/_hooks/useUnblockProfile";
import { useProfile } from "@/app/shared-hooks/useProfile";
import { Lock } from "lucide-react";
import { showConfirmation } from "@/shared-lib";
import { useImageRequest } from "@/app/(client)/dashboard/_hooks/useImageRequest";
import { useTranslation } from "react-i18next";

export default function ProfileCard({
                                        profile,
                                        blocked = false,
                                    }: {
    profile: MemberProfile;
    blocked?: boolean;
}) {
    const { t } = useTranslation();
    const [loaded, setIsLoaded] = useState(false);
    const { response } = useProfile();

    const { trigger: sendLike, loading } = useSendLike();
    const { trigger } = useUnblockUser();
    const { requestTrigger } = useImageRequest();

    const currentUser = response?.user;
    const hasProfilePicture = !!currentUser?.image;
    const isFreeMember = !currentUser?.isPremium;

    const photoSetting = profile.PhotoSetting[0] || {
        onlyMembersWithPhotoCanSee: false,
        blurForFreeMembers: false,
        onlyVipCanSee: false,
        onRequestOnly: false,
    };

    const onlyMembersWithPhotoCanSee = photoSetting.onlyMembersWithPhotoCanSee;
    const blurForFreeMembers = photoSetting.blurForFreeMembers;
    const onlyVipCanSee = photoSetting.onlyVipCanSee;
    const onRequestOnly = photoSetting.onRequestOnly;

    // Determine if we should blur based on current user's status and target's settings
    const shouldBlur =
        (onlyMembersWithPhotoCanSee && !hasProfilePicture) ||
        (blurForFreeMembers && isFreeMember) ||
        (onlyVipCanSee && isFreeMember) ||
        onRequestOnly;

    const handleImageRequest = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        showConfirmation(() => requestTrigger(profile.id));
    };

    const renderImageOverlay = () => {
        if (!shouldBlur) return null;

        switch (true) {
            case (blurForFreeMembers && isFreeMember):
                return (
                    <div
                        className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-xs text-center font-semibold"
                        onClick={handleImageRequest}
                    >
                        <Lock />
                        {t("Visible for Premium Members")}
                        <br />
                        <p className="text-xs font-normal">{t("View Plan")}</p>
                    </div>
                );

            case (onlyMembersWithPhotoCanSee && !hasProfilePicture):
                return (
                    <div className="absolute inset-0 bg-black/40 flex flex-col text-center items-center justify-center text-white text-sm font-semibold">
                        <Lock />
                        {t("Visible when You have photo")}
                    </div>
                );

            case onRequestOnly:
                return (
                    <div
                        className="absolute inset-0 bg-black/40 flex flex-col text-center items-center justify-center text-white text-sm font-semibold"
                        onClick={handleImageRequest}
                    >
                        <Lock />
                        {t("Request for photo")}
                        <br />
                    </div>
                );

            case (onlyVipCanSee && isFreeMember):
                return (
                    <div className="absolute inset-0 bg-black/40 flex flex-col text-center items-center justify-center text-white text-sm font-semibold">
                        <Lock />
                        {t("Only Vip members can see")}
                        <br />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="rounded-t-[5px] overflow-hidden hover:shadow-lg transition-shadow">
            <Link
                href={`/dashboard/search/${profile.id}`}
                className="relative flex aspect-square overflow-hidden"
            >
                <div className="bg-gray-200 w-full z-0">
                    <ImageWrapper
                        src={profile.image}
                        alt={profile.firstName}
                        className={cn(
                            "w-full h-full object-cover transition-opacity duration-500",
                            shouldBlur && "blur-xs",
                            loaded ? "opacity-100 z-0" : "opacity-0 z-0"
                        )}
                        onLoad={() => setIsLoaded(true)}
                    />

                    <img
                        src="/dashboardLogo.png"
                        alt={t("Loading placeholder")}
                        className={`absolute inset-0 w-36 mx-auto py-18 object-contain transition-opacity duration-300 ${loaded ? "opacity-0 z-0" : "opacity-100 z-10"
                        }`}
                    />

                    {renderImageOverlay()}
                </div>

                <div className="absolute bottom-0 text-center px-3 py-1 bg-white/70 w-full">
                    <h3 className="font-semibold text-sm text-app-pink">
                        {profile.firstName} {profile.lastName}
                    </h3>
                    <p className="text-xs font-medium text-gray-600">
                        {profile.age} {t("years")}, {profile.location}
                    </p>
                </div>
                <div
                    className={`absolute top-2 right-2 w-3 h-3 ${profile.isOnline ? "bg-app-green" : "bg-app-red"
                    } rounded-[5px] border-2 border-white`}
                ></div>
            </Link>

            <div className="block">
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        sendLike(Number(profile.id)).finally();
                    }}
                    className="text-xs text-gray-500 font-medium justify-center w-full bg-white/70 hover:text-white"
                    disabled={loading}
                >
                    {loading ? t("Liking...") : t("Like this Profile")}
                </Button>

                {blocked ? (
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            trigger(Number(profile.id)).finally();
                        }}
                        variant="theme"
                        size="sm"
                        className="w-full"
                    >
                        {t("Unblock Member")}
                    </Button>
                ) : (
                    <Link href={`/dashboard/search/${profile.id}`}>
                        <Button variant="theme" size="sm" className="w-full" type="button">
                            {t("Connect Now!")}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}