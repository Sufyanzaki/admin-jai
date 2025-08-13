import {MemberProfile} from "@/app/shared-types/member";
import ImageWrapper from "@/components/client/image-wrapper";
import {Button} from "@/components/client/ux/button";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {useState} from "react";
import {useSendLike} from "../_hooks/useSendLike";
import {useUnblockUser} from "../settings/blocked/_hooks/useUnblockProfile";

export default function ProfileCard({
  profile,
  blocked = false,
}: {
  profile: MemberProfile;
  blocked?: boolean;
}) {
  const [loaded, setIsLoaded] = useState(false);
  const { trigger: sendLike, loading } = useSendLike();
  const { trigger, loading: unblockLoading, error: unblockError } = useUnblockUser();

  return (
    <div className="relative rounded-t-[5px] overflow-hidden hover:shadow-lg transition-shadow">
      <Link
        href={`/dashboard/search/${profile.id}`}
        className="relative flex aspect-square "
      >
    <div className="relative bg-gray-200 w-full">
          <ImageWrapper
            src={profile.image}
            alt={profile.firstName}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-500",
      (profile.account === "private" || profile.account === "plus") && "blur-xs",
              loaded ? "opacity-100 z-0" : "opacity-0 z-0"
            )}
            onLoad={() => setIsLoaded(true)}
          />

        <img src="/dashboardLogo.png" alt="Loading placeholder" className={`absolute inset-0 w-36 mx-auto py-18 object-contain transition-opacity duration-300 ${loaded ? "opacity-0 z-0" : "opacity-100 z-10"}`} />

          {/* {profile.account === "private" ? (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-sm font-semibold">
                <Lock />
                Visible on Accept
              </div>
            ) : (
              profile.account === "plus" && (
                <div className="absolute inset-0 bg-black/40 flex flex-col text-center items-center justify-center text-white text-sm font-semibold">
                  <Lock />
                  Visible on Premium Members
                  <br />
                  <p className="text-xs font-normal">View Plan</p>
                </div>
              )
            )} */}
        </div>

        <div className="absolute bottom-0 text-center px-3 py-1 bg-white/70 w-full">
          <h3 className="font-semibold text-lg text-app-pink">
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="text-xs font-medium text-gray-600">
            {profile.age} jaar, {profile.location}
          </p>
        </div>
      </Link>

      <div
        className={`absolute top-2 right-2 w-3 h-3 ${
          profile.status === "online" ? "bg-app-green" : "bg-app-red"
        } rounded-[5px] border-2 border-white`}
      ></div>
      <div className="block">
        <Button
          onClick={(e) => {
            console.log("click");
            e.stopPropagation();
            e.preventDefault(); // <-- stops Link navigation
            sendLike(Number(profile.id)); // cast to number here
          }}
          variant="ghost"
          size="sm"
          className="text-xs text-gray-500 font-medium justify-center w-full bg-white/70"
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
          <Button variant="theme" size="sm" className="w-full">
            Connect Now!
          </Button>
        )}
      </div>
    </div>
  );
}
