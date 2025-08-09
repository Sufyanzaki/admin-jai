"use client";

import { Button } from "@/components/client/ux/button";
import { Badge } from "@/components/client/ux/badge";
import { ArrowLeft, Shield, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/client/ux/tabs";
import { useState } from "react";
import ImageWrapper from "@/components/client/image-wrapper";
import ComplainModal from "@/components/client/complain-modal";
import { useBasicInfo } from "@/app/shared-hooks/useBasicInfo";
import { useSendLike } from "../../../_hooks/useSendLike";

export function ProfileDetail() {
  const router = useRouter();
  const params = useParams();
  const { user, userLoading } = useBasicInfo(params?.id);
  const [openComplain, setOpenComplain] = useState(false);
  const { trigger: sendLike, loading } = useSendLike();

  const handleBack = () => {
    router.back();
  };

  const handleSendMessage = () => {
    if (user) {
      console.log("Send message to", user.firstName);
    }
  };

  const handleSendWink = () => {
    sendLike(Number(params?.id));
    if (user) {
      console.log("Send wink to", user.firstName);
    }
  };

  const handleReportProfile = () => {
    setOpenComplain(true);
  };

  if (userLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  // Helper: convert comma-separated string to array
  const toArray = (val?: string) =>
    val
      ? val
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
      : [];

  // Helper: get personality traits that are true
  const getPersonalityTraits = (traitsObj: Record<string, boolean>) =>
    Object.entries(traitsObj)
      .filter(([_, v]) => v)
      .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1));

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ComplainModal
        openComplain={openComplain}
        setOpenComplain={setOpenComplain}
      />
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
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm font-medium">
                {user.gender}, {user.age} • {user.origin} •{" "}
                {user.city || user.location} • {user.lastOnline || ""}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {user.isPremium && (
              <Badge className="bg-yellow-400 text-black h-9 py-1 px-4 rounded-[5px] font-semibold text-sm">
                <Star className="!w-4 !h-4 mr-1" />
                Gold
              </Badge>
            )}
            {user.isVerified && (
              <Badge className="bg-green-500 text-white h-9 py-1 px-4 rounded-[5px] font-semibold text-sm">
                <Shield className="!w-4 !h-4 mr-1" />
                Verified
              </Badge>
            )}
          </div>
        </div>
        <div className="px-5">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            <div className="space-y-4">
              <div className="relative">
                <ImageWrapper
                  src={user.image || "/placeholder.svg"}
                  alt={user.firstName}
                  className="w-full h-80 object-cover rounded-[5px]"
                />
              </div>
              <div className="space-y-2">
                <Button
                  onClick={handleSendMessage}
                  variant="theme"
                  size="lg"
                  className="w-full"
                >
                  Send Message
                </Button>
                <Button
                  onClick={handleSendWink}
                  variant="theme"
                  size="lg"
                  className="w-full"
                >
                  {loading ? "Sending Wink..." : "Send Wink"}
                </Button>
                <Button
                  onClick={handleReportProfile}
                  variant="ghost"
                  className="w-full"
                >
                  Report Profile
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-[5px] p-6 border border-gray-200 space-y-6">
                <h4 className="text-xl font-semibold">Profile Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-sm text-gray-700">
                      Username
                    </span>
                    <span className="font-normal text-sm text-gray-600">
                      {user.username}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-sm text-gray-700">
                      Email
                    </span>
                    <span className="font-normal text-sm text-gray-600 break-all">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-sm text-gray-700">
                      Gender
                    </span>
                    <span className="font-normal text-sm text-gray-600">
                      {user.gender}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-sm text-gray-700">
                      Age
                    </span>
                    <span className="font-normal text-sm text-gray-600">
                      {user.age}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-sm text-gray-700">
                      Origin
                    </span>
                    <span className="font-normal text-sm text-gray-600">
                      {user.origin}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-sm text-gray-700">
                      Relationship Status
                    </span>
                    <span className="font-normal text-sm text-gray-600">
                      {user.relationshipStatus}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-sm text-gray-700">
                      Religion
                    </span>
                    <span className="font-normal text-sm text-gray-600">
                      {user.religion}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-sm text-gray-700">
                      Children
                    </span>
                    <span className="font-normal text-sm text-gray-600">
                      {user.children ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold">My Habits</h4>
                  <div className="space-y-2 ">
                    {user.lifestyle &&
                      Object.entries(user.lifestyle).map(([label, value]) => (
                        <div
                          key={label}
                          className="flex justify-between items-center py-2 border-b border-gray-200  gap-2"
                        >
                          <span className="font-semibold text-sm text-gray-700">
                            {label.charAt(0).toUpperCase() + label.slice(1)}
                          </span>
                          <span className="font-normal text-sm text-gray-600">
                            {String(value)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold">
                    What do I look like?
                  </h4>
                  <div className="space-y-2">
                    {user.physicalAppearance &&
                      Object.entries(user.physicalAppearance).map(
                        ([label, value]) => (
                          <div
                            key={label}
                            className="flex justify-between items-center py-2 border-b border-gray-200 gap-2"
                          >
                            <span className="font-semibold text-sm text-gray-700">
                              {label.charAt(0).toUpperCase() + label.slice(1)}
                            </span>
                            <span className="font-normal text-sm text-gray-600">
                              {String(value)}
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 space-y-4">
              <div className="border border-gray-200 rounded-[5px] p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">About Me</h3>
                </div>
                <p className="text-sm leading-relaxed">
                  {user.shortDescription}
                </p>
              </div>
              <div className="border border-gray-200 rounded-[5px] p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    Education and Career
                  </h3>
                </div>
                <div className=" grid grid-cols-2 gap-x-6 gap-y-2">
                  {user.educationCareer &&
                    Object.entries(user.educationCareer).map(
                      ([label, value]) => (
                        <div
                          key={label}
                          className="flex justify-between items-center py-1 border-b border-b-gray-200 gap-2"
                        >
                          <span className="font-semibold text-sm text-gray-700">
                            {label.charAt(0).toUpperCase() + label.slice(1)}
                          </span>
                          <span className="">{String(value)}</span>
                        </div>
                      )
                    )}
                </div>
                <div className="my-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Personal Attributes and Behavior
                    </h3>
                  </div>
                  <div className=" grid grid-cols-2 gap-x-6 gap-y-2">
                    {user.personalityBehavior &&
                      getPersonalityTraits(user.personalityBehavior).map(
                        (trait) => (
                          <div
                            key={trait}
                            className="flex items-center gap-3 py-2 border-b border-b-gray-200 gap-2"
                          >
                            <div className="w-4 h-4 border-2 border-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                            <span className="font-normal text-sm text-gray-600">
                              {trait}
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>
                <div className="my-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Hobbies and Interests
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {user.hobbiesInterests &&
                      Object.entries(user.hobbiesInterests).map(
                        ([categoryKey, value]) => (
                          <div
                            key={categoryKey}
                            className="flex flex-row justify-between gap-5 border-b border-b-gray-200 gap-2"
                          >
                            <h4 className="font-medium text-gray-700 ">
                              {categoryKey.charAt(0).toUpperCase() +
                                categoryKey.slice(1)}
                            </h4>
                            <span className="text-end">
                              {toArray(String(value)).join(", ")}
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Expectations of partner
                    </h3>
                  </div>
                  <div className=" grid grid-cols-2 gap-x-4 gap-y-2">
                    {user.partnerExpectation &&
                      Object.entries(user.partnerExpectation).map(
                        ([label, value]) => (
                          <div
                            key={label}
                            className="flex justify-between items-center py-1 border-b border-b-gray-200 gap-2"
                          >
                            <span className="font-semibold text-sm text-gray-700">
                              {label.charAt(0).toUpperCase() + label.slice(1)}
                            </span>
                            <span className="font-normal text-sm text-gray-600">
                              {String(value)}
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* End desktop */}
      {/* Mobile */}
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
            {user.firstName} {user.lastName}
          </h1>
        </div>

        <div className="p-4">
          <div className="flex gap-4 mb-4">
            <ImageWrapper
              src={user.image || "/placeholder.svg"}
              alt={user.firstName}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600 text-sm">
                {user.age} jaar, {user.gender}, {user.relationshipStatus}
              </p>
              <p className="text-gray-500 text-xs mt-1">Member ID: {user.id}</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {user.isPremium && (
              <Badge className="bg-yellow-400 text-black py-1 px-3 rounded-full text-xs font-semibold">
                <Star className="w-3 h-3 mr-1" />
                Gold
              </Badge>
            )}
            {user.isVerified && (
              <Badge className="bg-green-500 text-white py-1 px-3 rounded-full text-xs font-semibold">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6">
            <Button
              onClick={handleSendMessage}
              className="flex-1"
              size="sm"
              variant="theme"
            >
              Send Message
            </Button>
            <Button
              onClick={handleSendWink}
              className="flex-1"
              size="sm"
              variant="theme"
            >
              Send Wink
            </Button>
            <Button
              onClick={handleReportProfile}
              className="flex-1"
              size="sm"
              variant="destructive"
            >
              Report Profile
            </Button>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="about" className="text-xs sm:text-sm">
                About Me
              </TabsTrigger>
              <TabsTrigger value="hobbies" className="text-xs sm:text-sm">
                Hobbies & Interest
              </TabsTrigger>
              <TabsTrigger value="character" className="text-xs sm:text-sm">
                Karakter
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                {user.shortDescription}
              </p>

              <div>
                <h3 className="font-semibold text-lg mb-4">Profile Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">
                      Username
                    </span>
                    <span className="text-sm text-gray-900">
                      {user.username}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">
                      Email
                    </span>
                    <span className="text-sm text-gray-900">{user.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">
                      Gender
                    </span>
                    <span className="text-sm text-gray-900">{user.gender}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">
                      Age
                    </span>
                    <span className="text-sm text-gray-900">{user.age}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">
                      Origin
                    </span>
                    <span className="text-sm text-gray-900">{user.origin}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">
                      Relationship Status
                    </span>
                    <span className="text-sm text-gray-900">
                      {user.relationshipStatus}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">
                      Religion
                    </span>
                    <span className="text-sm text-gray-900">
                      {user.religion}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">
                      Children
                    </span>
                    <span className="text-sm text-gray-900">
                      {user.children ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">
                  What do I look like?
                </h3>
                <div className="space-y-3">
                  {user.physicalAppearance &&
                    Object.entries(user.physicalAppearance).map(
                      ([label, value]) => (
                        <div
                          key={label}
                          className="flex justify-between py-2 border-b border-gray-100"
                        >
                          <span className="text-sm font-medium text-gray-600">
                            {label.charAt(0).toUpperCase() + label.slice(1)}
                          </span>
                          <span className="text-sm text-gray-900">
                            {String(value)}
                          </span>
                        </div>
                      )
                    )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hobbies" className="space-y-4">
              <h3 className="font-semibold text-lg">My Interests</h3>
              <div className="grid grid-cols-1 gap-3">
                {user.hobbiesInterests &&
                  Object.entries(user.hobbiesInterests).map(
                    ([categoryKey, value]) => (
                      <div
                        key={categoryKey}
                        className="flex items-center gap-3 py-2"
                      >
                        <div className="w-4 h-4 border-2 border-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="font-normal text-sm text-gray-800">
                          {toArray(String(value)).join(", ")}
                        </span>
                      </div>
                    )
                  )}
              </div>
            </TabsContent>

            <TabsContent value="character" className="space-y-4">
              <h3 className="font-semibold text-lg">Character Traits</h3>
              <div className="grid grid-cols-1 gap-3">
                {user.personalityBehavior &&
                  getPersonalityTraits(user.personalityBehavior).map(
                    (trait) => (
                      <div key={trait} className="flex items-center gap-3 py-2">
                        <div className="w-4 h-4 border-2 border-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="font-normal text-sm text-gray-800">
                          {trait}
                        </span>
                      </div>
                    )
                  )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="fixed bottom-4 left-4">
            <Button className="bg-blue-500 hover:bg-blue-600 rounded-full w-12 h-12 p-0">
              <span className="text-white font-bold">edit</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
