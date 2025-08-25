"use client";
import { HeroSection } from "./_components/hero-section";
import { Card } from "@/components/client/ux/card";
import { Button } from "@/components/client/ux/button";
import { Container } from "@/components/client/ux/container";
import { SignupForm } from "./_components/signup-form";
import { useHome } from "@/app/shared-hooks/useHome";
import Preloader from "@/components/shared/Preloader";
import RecentJoin from "@/app/(client)/(public)/_components/recent-join";
import { useTranslation } from "react-i18next";

const steps = [
  {
    number: "01",
    title: "Create your free account",
    description: "Sign up quickly and easily to get started.",
    cardMargin: "lg:mr-12",
  },
  {
    number: "02",
    title: "Complete your profile details",
    description: "Fill in your personal information to connect better.",
    cardMargin: "lg:ml-12",
  },
  {
    number: "03",
    title: "Connect with other users",
    description: "Start building meaningful connections right away.",
    cardMargin: "lg:mr-12",
  },
];

export default function Home() {
  const { homeLoading, homeSettings } = useHome();
  const { t } = useTranslation();

  if (homeLoading)
    return (
        <div className="flex items-center flex-col justify-center h-screen">
          <Preloader />
          <p className="text-sm">{t("Loading...")}</p>
        </div>
    );

  if (!homeSettings) {
    return (
        <div className="flex items-center flex-col justify-center h-64 gap-3">
          <h2 className="text-2xl font-bold text-gray-700">
            {t("No data found")}
          </h2>
        </div>
    );
  }

  return (
      <main className="min-h-screen">
        <HeroSection />
        <div className="lg:hidden block sticky">
          <SignupForm />
        </div>
        <div className="sticky">
          <section className="w-full py-[50px] xl:pt-[115px] bg-white xl:pb-[92px]">
            <Container className="px-4 md:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-items-center">
                <div className="space-y-3 py-3">
                  <h2 className="text-black text-[22px] font-bold lg:text-[26px] xl:text-[34px] xl:leading-[48px] mb-[14px]">
                    {homeSettings.faqsTitle}
                  </h2>
                  <p className="text-[#011026] text-base font-normal xl:text-xl xl:leading-[31px]">
                    {homeSettings.faqlatestSubTitle}
                  </p>
                  <p className="pt-4 pb-5 text-[#676770] text-sm xl:text-base font-normal leading-[23px]">
                    {homeSettings.faqsDescription}
                  </p>
                  <div className="flex space-x-4">
                    <Button variant="theme" size="lg">
                      {t("Add Profile")}
                    </Button>
                  </div>
                </div>
                <div className="space-y-5 w-full lg:w-fit">
                  {steps.map((step, index) => (
                      <Card
                          key={index}
                          className={`flex flex-row px-6 items-start space-x-4 bg-transparent py-[27px] ${step.cardMargin}`}
                      >
                        <div className="w-10 h-10 bg-app-sky-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">
                        {step.number}
                      </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2 lg:text-base xl:text-lg md:text-xl">
                            {t(step.title)}
                          </h3>
                          <p className="text-gray-600 lg:text-sm xl:text-base md:text-lg">
                            {t(step.description)}
                          </p>
                        </div>
                      </Card>
                  ))}
                </div>
              </div>
            </Container>
          </section>
          <section className="bg-[#f7f8fb] py-[50px] xl:pt-20">
            <Container className="px-4 md:px-6 space-y-24">
              <RecentJoin />
            </Container>
          </section>
        </div>
      </main>
  );
}
