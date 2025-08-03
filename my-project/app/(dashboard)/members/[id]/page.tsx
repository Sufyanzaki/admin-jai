"use client"

import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ChevronLeft, Edit} from "lucide-react";
import Link from "next/link";
import BasicInformation from "@/app/(dashboard)/members/[id]/_components/BasicInformation";
import Living from "@/app/(dashboard)/members/[id]/_components/Living";
import AboutMe from "@/app/(dashboard)/members/[id]/_components/AboutMe";
import EducationAndCareer from "@/app/(dashboard)/members/[id]/_components/EducationAndCareer";
import Languages from "@/app/(dashboard)/members/[id]/_components/Languages";
import HobbiesAndInterest from "@/app/(dashboard)/members/[id]/_components/HobbiesAndInterest";
import PersonalityAndBehavior from "@/app/(dashboard)/members/[id]/_components/PersonalityAndBehavior";
import LifeStyle from "@/app/(dashboard)/members/[id]/_components/LifeStyle";
import PartnerExpectation from "@/app/(dashboard)/members/[id]/_components/PartnerExpectation";
import ManageStatus from "./_components/ManageStatus";
import BasicInfo from "@/app/(dashboard)/members/[id]/_components/BasicInfo";

const userProfile = [
    {
      id: "personal",
      section: "Basic Info",
      Data: BasicInformation
    },
    {
      id: "living",
      section: "Living",
      Data: Living
    },
    {
      id: "about_me",
      section: "About Me",
      Data: AboutMe
    },
    {
      id: "professional",
      section: "Education",
      Data: EducationAndCareer
    },
    {
      id: "languages",
      section: "Languages",
      Data: Languages
    },
    {
      id: "hobbies",
      section: "Hobbies",
      Data: HobbiesAndInterest
    },
    {
      id: "behavior",
      section: "Behavior",
      Data: PersonalityAndBehavior
    },
    {
      id: "life_style",
      section: "Lifestyle",
      Data: LifeStyle
    },
    {
      id: "partner",
      section: "Partner",
      Data: PartnerExpectation
    }
  ];

export default function MemberProfilePage({ params }: { params: { id: string } }) {

    const { id:memberId } = params;

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/members">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back to doctors</span>
                    </Link>
                </Button>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Member Profile</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="space-y-4">
                    <BasicInfo />
                    <ManageStatus />
                </div>

                {/* Main Content */}
                <div className="md:col-span-2">
                    <Card>
                        <Tabs defaultValue={userProfile[0].id} className="w-full">
                            <CardHeader className="xxl:pb-0 space-y-6">
                                <div className="flex items-center gap-4 justify-between flex-col sm:flex-row">
                                    <CardTitle className="text-xl font-semibold">Member Information</CardTitle>
                                    <Button variant="default" asChild>
                                        <Link href="/members/1/edit">
                                            <Edit className="h-4 w-4" />
                                            <span>Edit Profile</span>
                                        </Link>
                                    </Button>
                                </div>
                                <TabsList className="flex">
                                    {userProfile.map((tab) => (
                                        <TabsTrigger key={tab.id} className="px-4 py-2" value={tab.id}>{tab.section}</TabsTrigger>
                                    ))}
                                </TabsList>
                            </CardHeader>

                            {userProfile.map(({Data, id}) => (
                                <TabsContent value={id} key={id}>
                                    <Data memberId={memberId} />
                                </TabsContent>
                            ))}
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
}