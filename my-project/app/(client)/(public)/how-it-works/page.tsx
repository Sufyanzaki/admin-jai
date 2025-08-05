"use client"

import { Button } from "@/components/client/ux/button";
import { FAQItem } from "./_components/faq-item";
import { Card } from "@/components/client/ux/card";
import { Container } from "@/components/client/ux/container";
import ImageWrapper from "@/components/client/image-wrapper";
import useFaq from "./_hooks/useFaq";
import Preloader from "@/components/shared/Preloader";

export default function HowItWorksPage() {
  const { data: faqs, isLoading, error } = useFaq();

  if(!faqs) return (
      <div className="flex items-center flex-col justify-center h-64 my-28">
        <Preloader/>
        <p className="text-sm">Loading FAQ</p>
      </div>
  )

  return (
    <>
      <div className="py-[50px] pt-[114px] xl:pt-[124px] bg-white xl:pb-[92px]">
        <Container className="px-4 md:px-6">
          {/* Page Title */}
          <h3 className="text-[22px] lg:text-[26px] font-semibold text-gray-900 mb-6">
            How it work
          </h3>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20 justify-items-between items-center">
            {/* Left Side - Image */}
            <div className="">
              <ImageWrapper
                src="/assets/couple-coffee.png"
                alt="Couple having coffee together"
                className="w-full h-[390px] object-cover"
              />
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <h2 className="text-[22px] lg:text-[34px] font-bold text-gray-900">
                We put you in touch with nearby girls and guys!
              </h2>
              <p className="text-sm lg:text-base text-[#676770] lg:text-black leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent tempus eleifend risus ut congue. Pellentesque nec lorem
                elit. Pellentesque convallis mauris nisl eu dapibus pharetra eu
                tristique rhoncus consequat.
              </p>
              <div className="flex flex-row items-center lg:justify-start justify-center space-x-4 w-full px-4 lg:px-0">
                <Button
                  size={"lg"}
                  variant={"secondary"}
                  className="w-1/2 lg:w-fit"
                >
                  Add Profile
                </Button>
                <Button
                  size={"lg"}
                  variant={"secondary"}
                  className="w-1/2 lg:w-fit"
                >
                  Start Search
                </Button>
              </div>
            </div>
          </div>

          {/* Steps Section */}
          <div className="my-20">
            <div className="grid lg:grid-cols-2 gap-8 items-center justify-items-start">
              {/* Left Side - Steps Description */}
              <div className="w-[85%]">
                <h2 className="text-[22px] lg:text-[34px] font-bold text-gray-900 mb-4">
                  1,2,3 easy steps!
                </h2>
                <p className="text-dark-blue text-sm lg:text-xl font-medium leading-relaxed mb-6">
                  Find out everything you need to know and more about how our
                  website works.
                </p>
                <p className="text-[#676770] text-xs lg:text-sm leading-relaxed mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent tempus eleifend risus ut congue. Pellentesque nec
                  lorem elit. Pellentesque convallis mauris nisl eu dapibus
                  pharetra eu tristique rhoncus consequat. Vestibulum rhoncus
                  porta sem molestudae magna mollis euismod consectetur dolor
                  sit amet ultricies vehicula ut elit. Nullam quis risus eget
                  urna mollis ornare.
                </p>
                <Button variant={"theme"} size={"lg"} className="">
                  Get Profile
                </Button>
              </div>

              {/* Right Side - Steps */}
              <div className="flex flex-col items-end justify-end space-y-6 w-full">
                {/* Step 1 */}
                <Card className="flex flex-row p-6 items-center space-x-6 w-full">
                  <div className="w-12 h-12 min-w-12 min-h-12 bg-[#1F92B5] hover:bg-app-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-xl">01</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-base lg:text-[22px]  mb-1">
                      Create your free account
                    </h3>
                    <p className="font-light text-black text-xs lg:text-base">
                      Nulla vitae elit libero pharetra augue dapibus.
                    </p>
                  </div>
                </Card>

                {/* Step 2 */}
                <Card className="flex flex-row p-6 items-center space-x-6 w-full lg:w-[90%]">
                  <div className="w-12 h-12 min-w-12 min-h-12 bg-[#1F92B5] hover:bg-app-pink rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xl">02</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-base lg:text-[22px] mb-1">
                      Create your details
                    </h3>
                    <p className="font-light text-black text-xs lg:text-base">
                      Vivamus sagittis lacus vel augue laoreet.
                    </p>
                  </div>
                </Card>

                {/* Step 3 */}
                <Card className="flex flex-row p-6 items-center space-x-6 w-full">
                  <div className="w-12 h-12 min-w-12 min-h-12 bg-[#1F92B5] hover:bg-app-pink rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xl">03</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-base lg:text-[22px] mb-1">
                      Connect with users
                    </h3>
                    <p className="font-light text-black text-xs lg:text-base">
                      Cras mattis consectetur purus sit amet.
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
            <div className="grid lg:grid-cols-2 space-x-4 space-y-10">
              {isLoading ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              ) : error ? (
                <div className="text-center py-10 text-red-500">
                  <p>Error loading FAQs</p>
                </div>
              ) : (
                faqs.map((faq, index) => (
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
