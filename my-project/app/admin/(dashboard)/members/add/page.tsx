"use client";

import {Button} from "@/components/admin/ui/button";
import { useTranslation } from "react-i18next";
import {Tabs, TabsList, TabsTrigger} from "@/components/admin/ui/tabs";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";
import {useState} from "react";
import PersonalInfoTab from "@/app/admin/(dashboard)/members/_components/PersonalInfoTab";
import ProfessionalTab from "@/app/admin/(dashboard)/members/_components/ProfessionalTab";
import BehaviorTab from "@/app/admin/(dashboard)/members/_components/BehaviorTab";
import PartnerTab from "@/app/admin/(dashboard)/members/_components/PartnerTab";
import LifeStyleTab from "@/app/admin/(dashboard)/members/_components/LifeStyleTab";
import HobbiesTab from "@/app/admin/(dashboard)/members/_components/HobbiesTab";
import LanguagesTab from "@/app/admin/(dashboard)/members/_components/LanguagesTab";
import LivingTab from "@/app/admin/(dashboard)/members/_components/LivingTab";
import AboutMeTab from "@/app/admin/(dashboard)/members/_components/AboutMeTab";
import {useRouter} from "next/navigation";

export default function AddMemberPage() {
  const { t } = useTranslation();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState("personal");

    return (
      <div className="flex flex-col gap-5 p-4 xl:p-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/members">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">{t("Back")}</span>
            </Link>
          </Button>
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">{t('Add Member')}</h1>
            <p className="text-muted-foreground">{t('Add a new member to your app.')}</p>
          </div>
        </div>

        <Tabs
            defaultValue="personal"
            className="space-y-4"
            value={activeTab}
            onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="personal">{t('Basic Information')}</TabsTrigger>
            <TabsTrigger value="professional">{t('Education & Career')}</TabsTrigger>
            <TabsTrigger value="behavior">{t('Personality & Behavior')}</TabsTrigger>
            <TabsTrigger value="partner">{t('Partner Expectation')}</TabsTrigger>
            <TabsTrigger value="life_style">{t('Life Style')}</TabsTrigger>
            <TabsTrigger value="hobbies">{t('Hobbies & Interest')}</TabsTrigger>
            <TabsTrigger value="languages">{t('Languages')}</TabsTrigger>
            <TabsTrigger value="living">{t('Living')}</TabsTrigger>
            <TabsTrigger value="about_me">{t('About Me')}</TabsTrigger>
          </TabsList>

          {/* Only render the active tab */}
          {activeTab === "personal" && <PersonalInfoTab fetchFinishCallback={()=>{}} callback={()=>setActiveTab("professional")} />}
          {activeTab === "professional" && <ProfessionalTab callback={()=>setActiveTab("behavior")}/>}
          {activeTab === "behavior" && <BehaviorTab callback={()=>setActiveTab("partner")}/>}
          {activeTab === "partner" && <PartnerTab callback={()=>setActiveTab("life_style")}/>}
          {activeTab === "life_style" && <LifeStyleTab callback={()=>setActiveTab("hobbies")}/>}
          {activeTab === "hobbies" && <HobbiesTab callback={()=>setActiveTab("languages")}/>}
          {activeTab === "languages" && <LanguagesTab callback={()=>setActiveTab("living")}/>}
          {activeTab === "living" && <LivingTab callback={()=>setActiveTab("about_me")}/>}
          {activeTab === "about_me" && <AboutMeTab callback={()=>router.push("/admin/members")} />}
        </Tabs>
      </div>
  );
}