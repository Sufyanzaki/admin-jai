"use client";

import { Button } from "@/components/client/ux/button";
import { Card, CardContent } from "@/components/client/ux/card";
import { Bell, MoveRight } from "lucide-react";
import ProfileCard from "./_components/profile-card";
import { cardData, matches, recentMembers } from "./_const/contant";
import {useSession} from "next-auth/react";

export default function Dashboard() {
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
        <div className="py-6 space-y-8">
          <div>
            <div>
              <div className="flex items-center justify-between mb-4 space-y-3">
                <h2 className="font-semibold text-xl md:text-3xl">
                  Here are Today&apos;s top Matches for you.
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-app-pink text-xs sm:text-sm font-semibold"
                >
                  Meer tonen <MoveRight />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-5">
                {matches.slice(0, 6).map((match) => (
                  <ProfileCard key={match.id} profile={match} />
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4 space-y-3">
            <div className="flex items-center justify-between mb-4 space-y-3">
              <div>
                <h2 className="font-semibold text-xl md:text-3xl">
                  Members you may like
                </h2>
                <p>Members who match many of your prefrences</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-app-pink text-xs sm:text-sm font-semibold"
              >
                Meer tonen <MoveRight />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {recentMembers.map((match) => (
                <ProfileCard key={match.id} profile={match} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
