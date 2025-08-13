"use client"

import { ContactForm } from "./_components/contact-form";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/client/ux/container";
import ImageWrapper from "@/components/client/image-wrapper";
import {useContact} from "@/app/shared-hooks/useContact";
import Preloader from "@/components/shared/Preloader";
import type React from "react";

export default function ContactPage() {

  const { contactSettings, contactLoading } = useContact();

  if(contactLoading) return (
      <div className="flex items-center flex-col justify-center h-64">
        <Preloader/>
        <p className="text-sm">Loading ...</p>
      </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <Container className="px-4 md:px-6">
        <div className="py-[50px] pt-[114px] xl:pt-[124px] xl:pb-[92px]">
          <h3 className="text-[22px] lg:text-[26px] font-semibold text-base lg:text-lg mb-6">
            Contact
          </h3>

          <div className="grid lg:grid-cols-2 gap-12 mb-20 justify-items-between items-center">
            <ImageWrapper
              src="/assets/contact-office.png"
              alt="Office space with people working"
              className="w-full h-[467px] object-cover"
            />

            <div className="space-y-2">
              <div className="mb-5">
                <p className="text-app-pink font-bold text-base lg:text-lg uppercase tracking-wide mb-2">
                  LET&apos;S TALK
                </p>
                <h2 className="text-[22px] font-semibold lg:text-[34px] lg:font-bold leading-relaxed text-[#011026] mb-4">
                  Got any questions? Don&apos;t hesitate to get in touch.
                </h2>
                <p className="text-[#676770] font-normal text-sm lg:text-black lg:text-lg lg:font-semibold lg:pl-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <MapPin className="w-[15px] h-[17px] lg:w-5 lg:h-5 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base lg:text-lg">
                      Address
                    </h3>
                    <p className="text-sm lg:text-[17px] ">
                      Buckingham Palace, London.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <Phone className="w-[15px] h-[17px] lg:w-5 lg:h-5 text-app-pink" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base lg:text-lg">
                      Phone
                    </h3>
                    <p className="text-sm lg:text-[17px] ">+44 (0) 456 78 90</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <Mail className="w-[15px] h-[17px] lg:w-5 lg:h-5 text-app-pink" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base lg:text-lg">
                      Email
                    </h3>
                    <p className="text-sm lg:text-[17px] ">
                      email@mywebsite.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="flex justify-center items-center bg-white">
            <Container className="px-4 md:px-6">
              <ContactForm />
            </Container>
          </div>
        </div>
      </Container>
    </div>
  );
}
