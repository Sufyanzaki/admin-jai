"use client";

import { Button } from "@/components/client/ux/button";
import { Badge } from "@/components/client/ux/badge";
import { ArrowLeft, Shield, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/client/ux/tabs";
import {
  appearanceInfo,
  basicInfo,
  educationAndCareerInfo,
  habitsInfo,
  hobbiesAndInterests,
  mobileAppearanceInfo,
  mobileBasicInfo,
  partnerExpectations,
  personalityTraits,
  profileData,
} from "@/app/dashboard/_const/profile";
import { useState } from "react";
import ImageWrapper from "@/components/client/image-wrapper";
import ComplainModal from "@/components/client/complain-modal";

export function ProfileDetail() {
  const router = useRouter();

  const [openComplain, setOpenComplain] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSendMessage = () => {
    console.log("Send message to", profileData.name);
  };

  const handleSendWink = () => {
    console.log("Send wink to", profileData.name);
  };

  const handleReportProfile = () => {
    setOpenComplain(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <ComplainModal openComplain={openComplain} setOpenComplain={setOpenComplain} />
      <div className="hidden lg:block">
        <div className="flex flex-row justify-between px-6 py-4">
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
              <h1 className="text-3xl font-semibold">{profileData.name}</h1>
              <p className="text-sm font-medium">
                {profileData.gender}, {profileData.age} • {profileData.location}{" "}
                • {profileData.city} • {profileData.lastOnline}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {profileData.isGold && (
              <Badge className="bg-yellow-400 text-black h-9 py-1 px-4 rounded-[5px] font-semibold text-sm">
                <Star className="!w-4 !h-4 mr-1" />
                Gold
              </Badge>
            )}
            {profileData.isVerified && (
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
                  src={profileData.image || "/placeholder.svg"}
                  alt={profileData.name}
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
                  Send Wink
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
                  {basicInfo.map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center py-2 border-b border-gray-200"
                    >
                      <span className="font-semibold text-sm text-gray-700">
                        {item.label}
                      </span>
                      <span className="font-normal text-sm text-gray-600">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold">My Habits</h4>
                  <div className="space-y-2 ">
                    {habitsInfo.map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between items-center py-2 border-b border-gray-200"
                      >
                        <span className="font-semibold text-sm text-gray-700">
                          {item.label}
                        </span>
                        <span className="font-normal text-sm text-gray-600">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold">
                    What do I look like?
                  </h4>

                  <h3 className="font-semibold"></h3>
                  <div className="space-y-2">
                    {appearanceInfo.map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between items-center py-2 border-b border-gray-200"
                      >
                        <span className="font-semibold text-sm text-gray-700">
                          {item.label}
                        </span>
                        <span className="font-normal text-sm text-gray-600">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 space-y-4">
              <div className="border border-gray-200 rounded-[5px] p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">About Me</h3>
                </div>
                <p className="text-sm leading-relaxed">{profileData.aboutMe}</p>
              </div>
              <div className="border border-gray-200 rounded-[5px] p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    Education and Career
                  </h3>
                </div>
                <div className=" grid grid-cols-2 gap-x-6 gap-y-2">
                  {educationAndCareerInfo.map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center py-1 border-b border-b-gray-200"
                    >
                      <span className="font-semibold text-sm text-gray-700">
                        {item.label}
                      </span>
                      <span className="">{item.value}</span>
                    </div>
                  ))}
                </div>{" "}
                <div className="my-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Personal Atributes and behavior
                    </h3>
                  </div>
                  <div className=" grid grid-cols-2 gap-x-6 gap-y-2">
                    {personalityTraits.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 py-2 border-b border-b-gray-200"
                      >
                        <div className="w-4 h-4 border-2 border-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="font-normal text-sm text-gray-600">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>{" "}
                </div>
                <div className="my-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Hobbies and Interests
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold"></h3>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(hobbiesAndInterests).map(
                      ([categoryKey, category]) => (
                        <div
                          key={categoryKey}
                          className="flex flex-row justify-between gap-5 border-b border-b-gray-200"
                        >
                          <h4 className="font-medium text-gray-700 ">
                            {category.label}
                          </h4>

                          {category.options.map((option, index) => (
                            <label key={index} className="text-end">
                              {option}
                            </label>
                          ))}
                        </div>
                      )
                    )}
                  </div>{" "}
                </div>
                <div className="">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Expectations of partner
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold"></h3>
                  </div>
                  <div className=" grid grid-cols-2 gap-x-4 gap-y-2">
                    {partnerExpectations.map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between items-center py-1 border-b border-b-gray-200"
                      >
                        <span className="font-semibold text-sm text-gray-700">
                          {item.category}
                        </span>
                        <span className="font-normal text-sm text-gray-600">{item.label}</span>
                      </div>
                    ))}
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <h1 className="text-lg font-semibold">{profileData.name}</h1>
        </div>

        <div className="p-4">
          <div className="flex gap-4 mb-4">
            <ImageWrapper
              src={profileData.image || "/placeholder.svg"}
              alt={profileData.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{profileData.name}</h2>
              <p className="text-gray-600 text-sm">
                {profileData.age} jaar, {profileData.gender}, single, nooit
                getrouwd
              </p>
              <p className="text-gray-500 text-xs mt-1">Member ID: 20240721</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {profileData.isGold && (
              <Badge className="bg-yellow-400 text-black py-1 px-3 rounded-full text-xs font-semibold">
                <Star className="w-3 h-3 mr-1" />
                Gold
              </Badge>
            )}
            {profileData.isVerified && (
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
              onClick={handleSendWink}
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
                {profileData.aboutMe}
              </p>

              <div>
                <h3 className="font-semibold text-lg mb-4">Profile Details</h3>
                <div className="space-y-3">
                  {mobileBasicInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b border-gray-100"
                    >
                      <span className="text-sm font-medium text-gray-600">
                        {item.label}
                      </span>
                      <span className="text-sm text-gray-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">
                  What do I look like?
                </h3>
                <div className="space-y-3">
                  {mobileAppearanceInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b border-gray-100"
                    >
                      <span className="text-sm font-medium text-gray-600">
                        {item.label}
                      </span>
                      <span className="text-sm text-gray-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hobbies" className="space-y-4">
              <h3 className="font-semibold text-lg">My Interests</h3>
              <div className="grid grid-cols-1 gap-3">
                {profileData.interests.map((interest, index) => (
                  <div key={index} className="flex items-center gap-3 py-2">
                    <div className="w-4 h-4 border-2 border-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="font-normal text-sm text-gray-800">
                      {interest}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="character" className="space-y-4">
              <h3 className="font-semibold text-lg">Character Traits</h3>
              <p className="text-sm text-gray-600">
                Character information will be displayed here.
              </p>
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
