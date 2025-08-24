"use client";

import { Button } from "@/components/client/ux/button";
import { Container } from "@/components/client/ux/container";
import { SignupForm } from "./signup-form";
import { useHome } from "@/app/shared-hooks/useHome";
import Preloader from "@/components/shared/Preloader";
import type React from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { homeLoading, homeSettings } = useHome();
  const { data: session } = useSession();
  const { t } = useTranslation();

  if (homeLoading)
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">{t("Loading...")}</p>
        </div>
    );

  return (
      <section className="sticky top-0">
        <div className="relative flex h-[360px] lg:min-h-screen items-center">
          <div
              className="absolute inset-0 bg-cover h-full bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${homeSettings?.bannerImage})`,
              }}
          ></div>

          <div className="relative z-10 w-full">
            <Container className="px-4 md:px-6">
              <div className="flex lg:flex-row justify-start lg:justify-between lg:items-center gap-6 pt-38 lg:pt-24 3xl:pt-0 lg:h-screen mb-2">
                <div className="text-white space-y-4 lg:space-y-6 ">
                  <h1 className="text-xl md:text-2xl lg:text-4xl lg:max-w-2/3 xl:text-5xl font-bold leading-tight">
                    {homeSettings?.bannerTitle}
                  </h1>

                  <p className="text-lg lg:text-xl text-gray-200 max-w-xs md:max-w-md">
                    {homeSettings?.bannerSubTitle}
                  </p>
                  <div className="hidden lg:block">
                    <Button className="font-mon font-semibold" size="xl">
                      {t("Join now")}
                    </Button>
                  </div>
                  <div className="lg:hidden block">
                    <Button
                        className="font-mon font-semibold rounded-[3.24px] text-[12.96px] w-[100px]"
                        size="sm"
                    >
                      {t("Join now")}
                    </Button>
                  </div>
                </div>
                {!session?.user && (
                    <div className="hidden lg:block">
                      <SignupForm />
                    </div>
                )}
              </div>
            </Container>
          </div>
        </div>
      </section>
  );
}
