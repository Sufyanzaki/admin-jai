"use client";

import { Button } from "@/components/client/ux/button";
import { Badge } from "@/components/client/ux/badge";
import { ArrowLeft, Lock, Shield, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/client/ux/tabs";
import { MouseEvent, ReactNode, useState } from "react";
import ImageWrapper from "@/components/client/image-wrapper";
import ComplainModal from "@/components/client/complain-modal";
import { useBasicInfo } from "@/app/shared-hooks/useBasicInfo";
import { useSendLike } from "../../../_hooks/useSendLike";
import { useCreateChat } from "@/app/(client)/dashboard/chat/_hooks/useCreateChat";
import { MemberPersonalityBehavior } from "@/app/shared-types/member";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { showConfirmation } from "@/shared-lib";
import { useImageRequest } from "@/app/(client)/dashboard/_hooks/useImageRequest";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function ProfileDetail() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? '';
  const { user, userLoading } = useBasicInfo(id);
  const [openComplain, setOpenComplain] = useState(false);
  const { trigger: sendLike, loading } = useSendLike();
  const { sendMessageRefetch, messageLoading } = useCreateChat();
  const { requestTrigger } = useImageRequest()

  const [loaded, setIsLoaded] = useState(false);

  const hasProfilePicture = !!user?.image;
  const isFreeMember = !user?.isPremium;

  const onlyMembersWithPhotoCanSee = user?.PhotoSetting[0]?.onlyMembersWithPhotoCanSee === hasProfilePicture;
  const blurForFreeMembers = user?.PhotoSetting[0]?.blurForFreeMembers === isFreeMember;
  const onlyVipCanSee = user?.PhotoSetting[0]?.onlyVipCanSee === isFreeMember;
  const onRequestOnly = user?.PhotoSetting[0]?.onRequestOnly;

  const blur = onlyVipCanSee || onRequestOnly || blurForFreeMembers || onlyMembersWithPhotoCanSee;

  const handleImageRequest = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    showConfirmation(() => requestTrigger(id));
  };

  const handleBack = () => router.back();

  const handleSendMessage = async () => {
    if (!id) return;
    sendMessageRefetch(id).then(res => {
      if (res?.data?.fullChat?.id) {
        router.push(`/dashboard/chat?chatId=${res.data.fullChat.id}`);
      }
    });
  };

  const handleSendWink = () => {
    if (params?.id) {
      sendLike(Number(params.id)).finally();
    }
  };

  const handleReportProfile = () => setOpenComplain(true);

  const getDisplayValue = (value?: string | number) => value || '-';
  const toArray = (val?: string) => val ? val.split(",").map(v => v.trim()).filter(Boolean) : [];
  const getPersonalityTraits = (traitsObj: MemberPersonalityBehavior | null) => {
    if (!traitsObj) return [];
    return Object.entries(traitsObj || {})
      .filter(([_, v]) => v)
      .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1));
  }

  if (userLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {t("Loading...")}
      </div>
    );
  }

  const ProfileSection = ({ title, children }: { title: string; children: ReactNode }) => (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold">{title}</h4>
      {children}
    </div>
  );

  const DetailRow = ({ label, value }: { label: string; value?: string | number }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-200">
      <span className="font-semibold text-sm text-gray-700">
        {label}
      </span>
      <span className="font-normal text-sm text-gray-600">
        {getDisplayValue(value)}
      </span>
    </div>
  );

  const PersonalityTrait = ({ trait }: { trait: string }) => (
    <div className="flex items-center gap-3 py-2 border-b border-b-gray-200">
      <div className="w-4 h-4 border-2 border-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      </div>
      <span className="font-normal text-sm text-gray-600">
        {trait}
      </span>
    </div>
  );

  const renderImageOverlay = () => {
    switch (true) {
      case blurForFreeMembers:
        return (
          <div
            className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-xs text-center font-semibold"
            onClick={handleImageRequest}
          >
            <Lock />
            {t("Visible for Premium Members")}
            <br />
            <p className="text-xs font-normal">View Plan</p>
          </div>
        );

      case onlyMembersWithPhotoCanSee:
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

      case onlyVipCanSee:
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
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ComplainModal
        openComplain={openComplain}
        setOpenComplain={setOpenComplain}
        userId={Number(user?.id)}
      />

      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="flex flex-row justify-between px-6 py-4 overflow-x-hidden">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-semibold">
                {getDisplayValue(user.firstName)} {getDisplayValue(user.lastName)}
              </h1>
              <p className="text-sm font-medium">
                {getDisplayValue(user.gender)}, {getDisplayValue(user.age)} • {getDisplayValue(user.origin)} •
                {getDisplayValue(user.living?.city || user.living?.state)} •
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {user.isPremium && (
              <Badge className="bg-yellow-400 text-black h-9 py-1 px-4 rounded-[5px] font-semibold text-sm">
                <Star className="!w-4 !h-4 mr-1" />
                {t("Gold")}
              </Badge>
            )}
            <Badge className="bg-green-500 text-white h-9 py-1 px-4 rounded-[5px] font-semibold text-sm">
              <Shield className="!w-4 !h-4 mr-1" />
              {t("Verified")}
            </Badge>
          </div>
        </div>

        <div className="px-5">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            <div className="space-y-4">
              <div className="relative aspect-square ">
                <ImageWrapper
                  src={user.image || "/placeholder.svg"}
                  alt={user.firstName || "Profile"}
                  className={cn(
                    "w-full h-full object-cover transition-opacity duration-500",
                    blur && "blur-xs",
                    loaded ? "opacity-100 z-0" : "opacity-0 z-0"
                  )}
                  onLoad={() => setIsLoaded(true)}
                />
                <img
                  src="/dashboardLogo.png"
                  alt="Loading placeholder"
                  className={`absolute inset-0 w-36 mx-auto py-18 object-contain transition-opacity duration-300 ${loaded ? "opacity-0 z-0" : "opacity-100 z-10"}`}
                />
                {renderImageOverlay()}
              </div>
              {String(session?.user?.id) !== String(id) && <div className="space-y-2">
                <div>
                  {user.isPremium ? <Button
                    onClick={handleSendMessage}
                    variant="theme"
                    size="lg"
                    disabled={messageLoading}
                    className="w-full"
                  >
                    {messageLoading ? "Processing" : "Send Message"}
                  </Button> : <Link href="/membership">
                    <Button
                      variant="theme"
                      size="lg"
                      className="w-full"
                    >
                      {t("Subscribe")}
                    </Button>
                  </Link>}
                </div>
                <Button
                  onClick={handleSendWink}
                  variant="theme"
                  size="lg"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Sending Wink..." : "Send Wink"}
                </Button>
                <Button
                  onClick={handleReportProfile}
                  variant="ghost"
                  className="w-full"
                >
                  {t("Report Profile")}
                </Button>
              </div>}
            </div>

            {/* Middle Column - Profile Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-[5px] p-6 border border-gray-200 space-y-6">
                <ProfileSection title="Profile Details">
                  <div className="space-y-2">
                    <DetailRow label="Username" value={user.username} />
                    <DetailRow label="Email" value={user.email} />
                    <DetailRow label="Gender" value={user.gender} />
                    <DetailRow label="Age" value={user.age} />
                    <DetailRow label="Origin" value={user.origin} />
                    <DetailRow label="Relationship Status" value={user.relationshipStatus} />
                    <DetailRow label="Religion" value={user.religion} />
                    <DetailRow label="Children" value={user.children ? "Yes" : "No"} />
                  </div>
                </ProfileSection>

                <ProfileSection title="My Habits">
                  <div className="space-y-2">
                    {user.lifestyle && Object.entries(user.lifestyle).map(([label, value]) => (
                      <DetailRow
                        key={label}
                        label={label.charAt(0).toUpperCase() + label.slice(1)}
                        value={value}
                      />
                    ))}
                  </div>
                </ProfileSection>

                <ProfileSection title="What do I look like?">
                  <div className="space-y-2">
                    {user.physicalAppearance && Object.entries(user.physicalAppearance).map(([label, value]) => (
                      <DetailRow
                        key={label}
                        label={label.charAt(0).toUpperCase() + label.slice(1)}
                        value={value}
                      />
                    ))}
                  </div>
                </ProfileSection>
              </div>
            </div>

            {/* Right Column - Additional Info */}
            <div className="col-span-2 space-y-4">
              <div className="border border-gray-200 rounded-[5px] p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">About Me</h3>
                </div>
                <p className="text-sm leading-relaxed">
                  {getDisplayValue(user.shortDescription)}
                </p>
              </div>

              <div className="border border-gray-200 rounded-[5px] p-6 bg-white">
                <ProfileSection title="Education and Career">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {user.educationCareer && Object.entries(user.educationCareer).map(([label, value]) => (
                      <DetailRow
                        key={label}
                        label={label.charAt(0).toUpperCase() + label.slice(1)}
                        value={value}
                      />
                    ))}
                  </div>
                </ProfileSection>

                <div className="my-10">
                  <ProfileSection title="Personal Attributes and Behavior">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                      {getPersonalityTraits(user.personalityBehavior).map(trait => (
                        <PersonalityTrait key={trait} trait={trait} />
                      ))}
                    </div>
                  </ProfileSection>
                </div>

                <div className="my-10">
                  <ProfileSection title="Hobbies and Interests">
                    <div className="space-y-4">
                      {user.hobbiesInterests && Object.entries(user.hobbiesInterests).map(([categoryKey, value]) => (
                        <div key={categoryKey} className="flex flex-row justify-between gap-5 border-b border-b-gray-200">
                          <h4 className="font-medium text-gray-700">
                            {categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}
                          </h4>
                          <span className="text-end">
                            {toArray(String(value)).join(", ") || '-'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ProfileSection>
                </div>

                <div>
                  <ProfileSection title="Expectations of partner">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {user.partnerExpectation && Object.entries(user.partnerExpectation).map(([label, value]) => (
                        <DetailRow
                          key={label}
                          label={label.charAt(0).toUpperCase() + label.slice(1)}
                          value={value}
                        />
                      ))}
                    </div>
                  </ProfileSection>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden bg-white min-h-screen">
        <div className="flex items-center gap-3 p-4 border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">
            {getDisplayValue(user.firstName)} {getDisplayValue(user.lastName)}
          </h1>
        </div>

        <div className="p-4">
          <div className="flex gap-4 mb-4">
            <ImageWrapper
              src={user.image || "/placeholder.svg"}
              alt={user.firstName || "Profile"}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                {getDisplayValue(user.firstName)} {getDisplayValue(user.lastName)}
              </h2>
              <p className="text-gray-600 text-sm">
                {getDisplayValue(user.age)} years, {getDisplayValue(user.gender)}, {getDisplayValue(user.relationshipStatus)}
              </p>
              <p className="text-gray-500 text-xs mt-1">Member ID: {getDisplayValue(user.id)}</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {user.isPremium && (
              <Badge className="bg-yellow-400 text-black py-1 px-3 rounded-full text-xs font-semibold">
                <Star className="w-3 h-3 mr-1" />
                {t("Gold")}
              </Badge>
            )}
            <Badge className="bg-green-500 text-white py-1 px-3 rounded-full text-xs font-semibold">
              <Shield className="w-3 h-3 mr-1" />
              {t("Verified")}
            </Badge>
          </div>

          <div className="flex gap-2 mb-6">
            <Button
              onClick={handleSendMessage}
              disabled={messageLoading}
              className="flex-1"
              size="sm"
              variant="theme"
            >
              {messageLoading ? t("Processing") : t("Send Message")}
            </Button>
            <Button
              onClick={handleSendWink}
              disabled={loading}
              className="flex-1"
              size="sm"
              variant="theme"
            >
              {loading ? t("Sending...") : t("Send Wink")}
            </Button>
            <Button
              onClick={handleReportProfile}
              className="flex-1"
              size="sm"
              variant="destructive"
            >
              {t("Report Profile")}
            </Button>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="about" className="text-xs sm:text-sm">
                {t("About Me")}
              </TabsTrigger>
              <TabsTrigger value="hobbies" className="text-xs sm:text-sm">
                {t("Hobbies & Interest")}
              </TabsTrigger>
              <TabsTrigger value="character" className="text-xs sm:text-sm">
                {t("Character")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                {getDisplayValue(user.shortDescription)}
              </p>

              <div>
                <h3 className="font-semibold text-lg mb-4">{t("Profile Details")}</h3>
                <div className="space-y-3">
                  <DetailRow label="Username" value={user.username} />
                  <DetailRow label="Email" value={user.email} />
                  <DetailRow label="Gender" value={user.gender} />
                  <DetailRow label="Age" value={user.age} />
                  <DetailRow label="Origin" value={user.origin} />
                  <DetailRow label="Relationship Status" value={user.relationshipStatus} />
                  <DetailRow label="Religion" value={user.religion} />
                  <DetailRow label="Children" value={user.children ? "Yes" : "No"} />
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">{t("What do I look like?")}</h3>
                <div className="space-y-3">
                  {user.physicalAppearance && Object.entries(user.physicalAppearance).map(([label, value]) => (
                    <DetailRow
                      key={label}
                      label={label.charAt(0).toUpperCase() + label.slice(1)}
                      value={value}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hobbies" className="space-y-4">
              <h3 className="font-semibold text-lg">{t("My Interests")}</h3>
              <div className="grid grid-cols-1 gap-3">
                {user.hobbiesInterests && Object.entries(user.hobbiesInterests).map(([categoryKey, value]) => (
                  <div key={categoryKey} className="flex items-center gap-3 py-2">
                    <div className="w-4 h-4 border-2 border-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="font-normal text-sm text-gray-800">
                      {toArray(String(value)).join(", ") || '-'}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="character" className="space-y-4">
              <h3 className="font-semibold text-lg">{t("Character Traits")}</h3>
              <div className="grid grid-cols-1 gap-3">
                {getPersonalityTraits(user.personalityBehavior).map(trait => (
                  <PersonalityTrait key={trait} trait={trait} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}