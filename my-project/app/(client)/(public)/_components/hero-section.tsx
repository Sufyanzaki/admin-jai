"use client";

import { Button } from "@/components/client/ux/button";
import { Container } from "@/components/client/ux/container";
import { SignupForm } from "./signup-form";
import {useHome} from "@/app/shared-hooks/useHome";
import Preloader from "@/components/shared/Preloader";
import type React from "react";

export function HeroSection() {

  const { homeLoading, homeSettings } = useHome();

  if(homeLoading) return (
      <div className="flex items-center flex-col justify-center h-64">
        <Preloader/>
        <p className="text-sm">Loading your profile information...</p>
      </div>
  )

  return (
    <section className="sticky top-0">
      <div className="relative flex h-[360px] lg:min-h-screen items-center">
        <div
          className="absolute inset-0 bg-cover h-full bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/assets/woman.png)`,
          }}
        ></div>

        <div className="relative z-10 w-full">
          <Container className="px-4 md:px-6">
            <div className="flex lg:flex-row justify-start lg:justify-between lg:items-center gap-6 pt-38 lg:pt-24 3xl:pt-0 lg:h-screen mb-2">
              <div className="text-white space-y-4 lg:space-y-6 ">
                <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  Making dating <span className="text-app-sky-blue">fun</span>
                  ...
                  <br />
                  without the games.
                </h1>

                <p className="text-lg lg:text-xl text-gray-200 max-w-xs md:max-w-md">
                  Connecting singles around the world for over 13 years.
                </p>
                <div className="hidden lg:block">
                  <Button className="font-mon font-semibold" size="xl">
                    Join now
                  </Button>
                </div>
                <div className="lg:hidden block">
                  <Button
                    className="font-mon font-semibold rounded-[3.24px] text-[12.96px] w-[100px]"
                    size="sm"
                  >
                    Join now
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <SignupForm />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
