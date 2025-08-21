import {MemberProfile} from "@/app/shared-types/member";
import ImageWrapper from "@/components/client/image-wrapper";
import {Button} from "@/components/client/ux/button";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {useState} from "react";
import {useSendLike} from "../_hooks/useSendLike";
import {useUnblockUser} from "../settings/blocked/_hooks/useUnblockProfile";
import {useCreateChat} from "../chat/_hooks/useCreateChat";
import {useRouter} from "next/navigation";
import {useProfile} from "@/app/shared-hooks/useProfile";
import {Lock} from "lucide-react";
import {showConfirmation} from "@/shared-lib";
import {MouseEvent} from "react";
import {useImageRequest} from "@/app/(client)/dashboard/_hooks/useImageRequest";

export default function ProfileCard({
  profile,
  blocked = false,
}: {
  profile: MemberProfile;
  blocked?: boolean;
}) {
  const router = useRouter();
  const [loaded, setIsLoaded] = useState(false);
  const { user } = useProfile();

  const { trigger: sendLike, loading } = useSendLike();
  const { trigger } = useUnblockUser();
  const { sendMessageRefetch } = useCreateChat();
  const { requestTrigger } = useImageRequest()

  const hasProfilePicture = !!user?.image;
  const isFreeMember = !user?.isPremium;

  const onlyMembersWithPhotoCanSee = profile?.PhotoSetting[0]?.onlyMembersWithPhotoCanSee === hasProfilePicture;
  const blurForFreeMembers = profile?.PhotoSetting[0]?.blurForFreeMembers === isFreeMember;
  const onlyVipCanSee = profile?.PhotoSetting[0]?.onlyVipCanSee === isFreeMember;
  const onRequestOnly = profile?.PhotoSetting[0]?.onRequestOnly;

  const blur = onlyVipCanSee || onRequestOnly || blurForFreeMembers || onlyMembersWithPhotoCanSee;

  const handleSendMessage = async () => {
    if (!profile?.id) return;
    sendMessageRefetch(profile?.id).then(res => {
      if (res?.data?.fullChat?.id) {
        router.push(`/dashboard/chat?chatId=${res.data.fullChat.id}`);
      }
    });
  };

  const handleImageRequest = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    showConfirmation(()=>requestTrigger(profile.id));
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

          {blurForFreeMembers ? (
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-xs text-center font-semibold"
                 onClick={handleImageRequest}>
              <Lock />
              Visible for Premium Members
              <br />
              <p className="text-xs font-normal">View Plan</p>
            </div>
          ) :
            onlyMembersWithPhotoCanSee ? (
              <div className="absolute inset-0 bg-black/40 flex flex-col text-center items-center justify-center text-white text-sm font-semibold">
                <Lock />
                Visible when You have photo
              </div>
            )
              : onRequestOnly ? (
                <div className="absolute inset-0 bg-black/40 flex flex-col text-center items-center justify-center text-white text-sm font-semibold">
                  <Lock />
                  Request for photo
                  <br />
                </div>
              ) : (<></>)
          }
        </div>

        <div className="absolute bottom-0 text-center px-3 py-1 bg-white/70 w-full">
          <h3 className="font-semibold text-sm text-app-pink">
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="text-xs font-medium text-gray-600">
            {profile.age} years, {profile.location}
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
            sendLike(Number(profile.id)).finally()
          }}
          className="text-xs text-gray-500 font-medium justify-center w-full bg-white/70 hover:text-white"
          disabled={loading}
        >
          {loading ? "Liking..." : "Like this Profile"}
        </Button>

        {blocked ? (
          <Button
            onClick={(e) => {
              console.log("click");
              e.stopPropagation();
              e.preventDefault(); // <-- stops Link navigation
              trigger(Number(profile.id)); // cast to number here
            }}
            variant="theme" size="sm" className="w-full">
            Unblock Member
          </Button>
        ) : (
          <Button onClick={handleSendMessage} variant="theme" size="sm" className="w-full">
            Connect Now!
          </Button>
        )}
      </div>
    </div>
  );
}
