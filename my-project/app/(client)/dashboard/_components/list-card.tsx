import Link from "next/link";
import { Button } from "@/components/client/ux/button";
import ImageWrapper from "@/components/client/image-wrapper";
import { MemberProfile } from "@/app/shared-types/member";
import { useSendLike } from "../_hooks/useSendLike";
import { useBlockUser } from "../_hooks/useBlockUser";
import { useCreateChat } from "../chat/_hooks/useCreateChat";
import { useRouter } from "next/navigation";

export default function ListCard({ profile }: { profile: MemberProfile }) {
  const router = useRouter();
  const { trigger: sendLike, loading } = useSendLike();
  const { trigger: blockUser, loading: blockLoading } = useBlockUser();
  const { sendMessageRefetch, messageLoading } = useCreateChat();

  const handleSendMessage = async () => {
    if (!profile?.id) return;
    sendMessageRefetch(profile?.id).then(res => {
      if (res?.data?.fullChat?.id) {
        router.push(`/dashboard/chat?chatId=${res.data.fullChat.id}`);
      }
    });
  };

  return (
      <div className="overflow-hidden rounded-[5px] transition-shadow cursor-pointer mb-4">
        <div className="hidden md:flex flex-row py-4">
          <Link href={`/dashboard/search/${profile.id}`}>
            <div className="relative flex-shrink-0">
              <ImageWrapper
                  src={profile.image || "/placeholder.svg"}
                  alt={profile.firstName || profile.lastName}
                  className="min-w-40 h-40 object-cover rounded-[5px]"
              />
              {(profile.isOnline) && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-app-green rounded-[5px] border-2 border-white"></div>
              )}
            </div>
          </Link>
          <div className="flex flex-col px-4 w-full">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-2">
                  <div className="flex gap-2 items-center">
                    <h3 className="font-semibold text-app-blue text-xl">
                      {profile.firstName} {profile.lastName}
                    </h3>
                    <p className="text-xl text-black">
                      {profile.age} years, {profile.location}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-2 py-1 h-7 bg-transparent"
                    onClick={handleSendMessage}
                >
                  📧 Message
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-2 py-1 h-7 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      sendLike(Number(profile.id));
                    }}
                >
                  {loading ? "Liking..." : " 💝 Interested"}
                </Button>
                {/* <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-2 py-1 h-7 bg-transparent"
                    onClick={(e) => e.stopPropagation()}
                >
                  ⭐ Favorite
                </Button> */}
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-2 py-1 h-7 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      blockUser(Number(profile.id));
                    }}
                >
                  {blockLoading ? "Blocking..." : "🚫 Block"}
                </Button>
              </div>
            </div>
            <div className="py-1">
              <p className="text-sm text-black font-normal mb-3 leading-relaxed">
                {profile.shortDescription || "No description available."}
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-black">Relationship Status</span>
                  <span className="font-normal">
                  : {profile.relationshipStatus || "Unknown"}
                </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-black">Religion</span>
                  <span className="text-black">
                  : {profile.religion || "Unknown"}
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden p-4">
          <div className="flex gap-3 mb-3">
            <Link href={`/dashboard/search/${profile.id}`}>
              <div className="relative flex-shrink-0">
                <ImageWrapper
                    src={profile.image || "/placeholder.svg"}
                    alt={profile.firstName}
                    className="w-24 h-24 object-cover rounded-[5px]"
                />
                {(profile.isOnline) && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-app-green rounded-[5px] border border-white"></div>
                )}
              </div>
            </Link>
            <div className="flex-1 min-w-0">
              <div>
                <h3 className="font-semibold text-black text-base leading-tight">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-xs text-black">
                  {profile.age} years, {profile.location}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-1 mt-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-2 py-1 h-8 justify-center bg-transparent"
                    onClick={(e) => e.stopPropagation()}
                >
                  📧 Message
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-2 py-1 h-8 justify-center bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      sendLike(Number(profile.id));
                    }}
                >
                  {loading ? "Liking..." : " 💝 Interested"}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-2 py-1 h-8 justify-center bg-transparent"
                    onClick={(e) => e.stopPropagation()}
                >
                  ⭐ Favorite
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-2 py-1 h-8 justify-center bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      blockUser(Number(profile.id));
                    }}
                >
                  {blockLoading ? "Blocking..." : "🚫 Block"}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-black font-normal leading-relaxed">
              {profile.shortDescription || "No description available."}
            </p>
          </div>
        </div>
      </div>
  );
}
