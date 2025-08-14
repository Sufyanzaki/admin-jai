"use client";

import { Button } from "@/components/client/ux/button";
import { Card, CardContent } from "@/components/client/ux/card";
import { Bell, MoveRight } from "lucide-react";
import ProfileCard from "./_components/profile-card";
import { getCardData } from "./_const/contant";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTodayMatches } from "./_hooks/useTodayMatches";
import { Skeleton } from "@/components/admin/ui/skeleton";
import { MemberProfile } from "@/app/shared-types/member";
import { useMayLike } from "./_hooks/useMayLike";
import { useProfile } from "@/app/shared-hooks/useProfile";
import Preloader from "@/components/shared/Preloader";
import type React from "react";
import Link from "next/link";
import { useBasicPages } from "@/app/admin/(dashboard)/frontend-settings/_hooks/useBasicPages";
import { useAgenda } from "@/app/shared-hooks/useAgenda";
import { useVee } from "@/app/shared-hooks/useVee";

export default function Dashboard() {
  const router = useRouter();
  const { user, userLoading, error } = useProfile();
  const { veeData, veeLoading } = useVee()
  // console.log( veeData)
  const cardData = getCardData(user);
  const { matches, matchesLoading, matchesError } = useTodayMatches();
  const { mayLike, mayLikeLoading, error: mayLikeError } = useMayLike();

  if (userLoading) {
    return (
      <div className="flex items-center flex-col justify-center h-64">
        <Preloader />
        <p className="text-sm">Loading your profile information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center flex-col justify-center h-64 gap-3">
        <h2 className="text-2xl font-bold text-red-600">
          Error loading your profile information
        </h2>
        <p className="text-muted-foreground">{error.message}</p>
        <Link href={"/auth/login"}>
          <Button variant={"theme"}>Log In</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 lg:p-6 flex flex-col min-h-screen gap-8">
        <div className="flex items-center gap-3">
          <div className="text-black space-y-1 lg:space-y-4">
            <h3 className="text-[22px] sm:text-2xl lg:text-3xl xl:text-[36px] font-semibold">
              Welcome Back
            </h3>
            <p className="text-xs md:text-sm lg:text-base font-normal">
              Here&apos;s an overview of your account.
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cardData.map((item, index) => (
              <Card
                key={index}
                className="border-[#dee2e6] rounded-[5px] shadow-none"
              >
                <CardContent className="flex gap-4 p-5">
                  <item.icon />
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold">
                      {item.title}
                    </h2>
                    <p className="text-sm md:text-base text-gray-600">
                      {item.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-[#dee2e6] rounded-[5px] p-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between shadow-none">
            <div className="flex gap-5 items-center">
              <Bell className="w-7 h-7 text-app-pink" />
              <div className="text-black">
                <h5 className="text-lg font-semibold">New Message</h5>
                <p className="text-sm lg:text-base font-normal">
                  You got 8 new messages.
                </p>
                <p className="text-[10px] text-gray-500 uppercase mt-1">
                  21hr ago
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 justify-center">
              <Button variant="outline" size="lg">
                Delete
              </Button>
              <Button variant="theme" size="lg">
                View
              </Button>
            </div>
          </Card>
        </div>

        {/* if user data not added show complete profile button */}
        {user?.route === "/auth/profile/partner-preferences" ? (
          <div className="py-6 space-y-8">
            <div>
              <div>
                <div className="flex items-center justify-between mb-4 space-y-3">
                  <h2 className="font-semibold text-xl md:text-3xl">
                    Here are Today&apos;s top Matches for you.
                  </h2>
                  <Button
                    onClick={() => router.push("/dashboard/matches")}
                    variant="ghost"
                    size="sm"
                    className="text-app-pink text-xs sm:text-sm font-semibold"
                  >
                    Show more <MoveRight />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-5">
                  {error ? (
                    <div className="flex items-center justify-center h-screen">
                      <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-600">
                          Error loading Today&apos;s Matches
                        </h2>
                        <p className="text-muted-foreground">{error.message}</p>
                      </div>
                    </div>
                  ) : matchesLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-[210px] w-full rounded-lg bg-app-gray/10"
                      />
                    ))
                  ) : Array.isArray(matches) ? (
                    matches.slice(0, 6).map((match: MemberProfile) => (
                      <ProfileCard key={match.id} profile={match} />
                    ))
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mb-4 space-y-3">
              <div className="flex items-center justify-between mb-4 space-y-3">
                <div>
                  <h2 className="font-semibold text-xl md:text-3xl">
                    Members you may like
                  </h2>
                  <p>Members who match many of your preferences</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-app-pink text-xs sm:text-sm font-semibold"
                >
                  Show more <MoveRight />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-5">
                {mayLikeError ? (
                  <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-red-600">
                        Error loading Members You May Like
                      </h2>
                      <p className="text-muted-foreground">
                        {mayLikeError.message}
                      </p>
                    </div>
                  </div>
                ) : mayLikeLoading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-[210px] w-full rounded-lg bg-app-gray/10"
                    />
                  ))
                ) : Array.isArray(mayLike) ? (
                  mayLike
                    .slice(0, 6)
                    .map((match) => (
                      <ProfileCard key={match.id} profile={match} />
                    ))
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <Card className="border-[#dee2e6] rounded-[5px] py-12 px-5 shadow-none">
            <div className="flex flex-col items-center gap-6">
              <p className="text-black text-sm lg:text-base font-normal">
                You haven&apos;t yet completed your full profile registration.
                Complete your profile to continue finding a partner.
              </p>

              <Button
                variant="theme"
                size="lg"
                onClick={() => router.push("auth/profile/create")}
              >
                Complete Profile
              </Button>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
