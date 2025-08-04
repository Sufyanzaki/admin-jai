"use client";

import { useState } from "react";
import { Button } from "@/components/client/ux/button";
import { Input } from "@/components/client/ux/input";
import { Textarea } from "@/components/client/ux/textarea";
import { Checkbox } from "@/components/client/ux/checkbox";
import ImageWrapper from "@/components/client/image-wrapper";

export function ContactForm() {
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  return (
    <div className="bg-white py-16 flex flex-col lg:flex-row gap-8 w-full justify-between rounded-[10px] lg:rounded-none">
      <div className="flex flex-col lg:flex-col gap-3 items-start mb-6 w-full">
        <div className="w-14 h-14">
          <ImageWrapper src={"/assets/sms.svg"} alt="sms" className="w-14 h-14" />
        </div>
        <div className="w-full">
          <h2 className="text-[22px] font-semibold text-[#1F2F49] lg:text-[34px] lg:font-bold lg:text-[#011026] mb-4">
            If you like what you see, lets work together.
          </h2>
          <p className="text-[#676770] text-sm font-normal lg:font-medium lg:text-[#011026] lg:text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            tempus eleifend risus ut congue. Pellentesque nec lorem elit.
            Pellentesque convallis mauris nisl eu dapibus pharetra eu tristique.
          </p>
        </div>
      </div>

      <form className="w-full space-y-8 mt-1">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <Input placeholder="Full Name" className="w-full h-12" />
            <Input type="email" placeholder="Email" className="w-full h-12" />
          </div>
          <Textarea placeholder="Message" className="min-h-[150px]" />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="privacy"
              checked={acceptedPrivacy}
              onCheckedChange={(checked) =>
                setAcceptedPrivacy(checked as boolean)
              }
            />
            <label htmlFor="privacy" className="text-sm">
              I accept the privacy policy.
            </label>
          </div>

          <div className="flex items-center justify-center">
            <Button
              size={"lg"}
              type="submit"
              className="w-fit bg-app-yellow text-white px-8 py-6"
              // disabled={!acceptedPrivacy}
            >
              Send
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
