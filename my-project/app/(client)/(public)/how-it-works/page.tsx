"use client";

import { Button } from "@/components/client/ux/button";
import { FAQItem } from "./_components/faq-item";
import { Card } from "@/components/client/ux/card";
import { Container } from "@/components/client/ux/container";
import ImageWrapper from "@/components/client/image-wrapper";
import Preloader from "@/components/shared/Preloader";
import useFaq from "@/app/shared-hooks/useFaq";
import { useHowWork } from "@/app/shared-hooks/useHowWork";
import { useTranslation } from "react-i18next";

export default function HowItWorksPage() {
  const { howWorkSettings, howWorkLoading } = useHowWork();
  const { data: faqs, isLoading, error } = useFaq();
  const { t } = useTranslation();

  if (isLoading || howWorkLoading)
    return (
        <div className="flex items-center flex-col justify-center h-screen my-28">
          <Preloader />
          <p className="text-sm">{t("Loading...")}</p>
        </div>
    );

  return (
      <>
        <div className="py-[50px] pt-[114px] xl:pt-[124px] bg-white xl:pb-[92px]">
          <Container className="px-4 md:px-6">
            <h3 className="text-[22px] lg:text-[26px] font-semibold text-gray-900 mb-6">
              {howWorkSettings?.Title}
            </h3>

            <div className="grid lg:grid-cols-2 gap-12 mb-20 justify-items-between items-center">
              <div>
                <ImageWrapper
                    src={
                      howWorkSettings?.bannerImage
                          ? howWorkSettings?.bannerImage
                          : "assets/couple-coffee.png"
                    }
                    alt={t("Couple enjoying coffee together")}
                    className="w-full h-[390px] object-cover"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-[22px] lg:text-[34px] font-bold text-gray-900">
                  {howWorkSettings?.bannerTitle}
                </h2>
                <p className="text-sm lg:text-base text-[#676770] lg:text-black leading-relaxed">
                  {howWorkSettings?.bannerSubTitle}
                </p>
                <div className="flex flex-row items-center lg:justify-start justify-center space-x-4 w-full px-4 lg:px-0">
                  <Button
                      size={"lg"}
                      variant={"secondary"}
                      className="w-1/2 lg:w-fit"
                  >
                    {t("Add Profile")}
                  </Button>
                  <Button
                      size={"lg"}
                      variant={"secondary"}
                      className="w-1/2 lg:w-fit"
                  >
                    {howWorkSettings?.searchPlaceholder}
                  </Button>
                </div>
              </div>
            </div>

            {/* Steps Section */}
            <div className="my-20">
              <div className="grid lg:grid-cols-2 gap-8 items-center justify-items-start">
                <div className="w-[85%]">
                  <h2 className="text-[22px] lg:text-[34px] font-bold text-gray-900 mb-4">
                    {t("Just 3 simple steps!")}
                  </h2>
                  <p className="text-dark-blue text-sm lg:text-xl font-medium leading-relaxed mb-6">
                    {t(
                        "Discover how easy it is to create your profile and connect with others on our platform."
                    )}
                  </p>
                  <p className="text-[#676770] text-xs lg:text-sm leading-relaxed mb-8">
                    {t(
                        "Our process is designed to be quick, simple, and effective. In just a few steps, you can set up your profile, share your details, and start connecting with people who match your preferences."
                    )}
                  </p>
                  <Button variant={"theme"} size={"lg"}>
                    {t("Get Started")}
                  </Button>
                </div>

                <div className="flex flex-col items-end justify-end space-y-6 w-full">
                  <Card className="flex flex-row p-6 items-center space-x-6 w-full">
                    <div className="w-12 h-12 min-w-12 min-h-12 bg-[#1F92B5] hover:bg-app-pink rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-xl">01</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-base lg:text-[22px] mb-1">
                        {t("Create your free account")}
                      </h3>
                      <p className="font-light text-black text-xs lg:text-base">
                        {t("Sign up quickly with just your basic details.")}
                      </p>
                    </div>
                  </Card>

                  <Card className="flex flex-row p-6 items-center space-x-6 w-full lg:w-[90%]">
                    <div className="w-12 h-12 min-w-12 min-h-12 bg-[#1F92B5] hover:bg-app-pink rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xl">02</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-base lg:text-[22px] mb-1">
                        {t("Complete your profile")}
                      </h3>
                      <p className="font-light text-black text-xs lg:text-base">
                        {t(
                            "Add information about yourself to make meaningful connections."
                        )}
                      </p>
                    </div>
                  </Card>

                  <Card className="flex flex-row p-6 items-center space-x-6 w-full">
                    <div className="w-12 h-12 min-w-12 min-h-12 bg-[#1F92B5] hover:bg-app-pink rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xl">03</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-base lg:text-[22px] mb-1">
                        {t("Connect with others")}
                      </h3>
                      <p className="font-light text-black text-xs lg:text-base">
                        {t(
                            "Start messaging, sharing, and building relationships instantly."
                        )}
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Container>

          {/* FAQ Section */}
          <div className="bg-white py-11 md:pt-16 lg:pt-20 pb-[56px] md:pb-[100px] lg:pb-[70px]">
            <Container className="px-4 md:px-6">
              <h2 className="text-xl font-semibold">
                {howWorkSettings?.faqTitle || t("Frequently Asked Questions")}
              </h2>
              <h3 className="text-lg font-medium mb-4">
                {howWorkSettings?.faqDescription ||
                    t("Find answers to common questions about how our platform works.")}
              </h3>
              <div className="grid lg:grid-cols-2 space-x-4 space-y-10">
                {isLoading ? (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">{t("Loading...")}</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 text-red-500">
                      <p>{t("Error loading FAQs")}</p>
                    </div>
                ) : (
                    faqs?.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))
                )}
              </div>
            </Container>
          </div>
        </div>
      </>
  );
}
