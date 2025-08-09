"use client";

import { Button } from "@/components/client/ux/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  badge: string;
  description: string;
}

export function MembershipSelection() {
  const router = useRouter();

  const plans: MembershipPlan[] = [
    {
      id: "free",
      name: "Free Membership",
      price: 24,
      duration: "24 Hours",
      badge: "24 Hours",
      description: "Free for 24 hour access!",
    },
    {
      id: "silver",
      name: "Silver Membership",
      price: 50,
      duration: "1 Month",
      badge: "1 Month",
      description: "$20 for 1 months access!",
    },
    {
      id: "gold",
      name: "Gold Membership",
      price: 75,
      duration: "365 Days",
      badge: "365 Days",
      description: "$50 for 6 months access!",
    },
  ];

  const handleSelectPlan = (planId: string) => {
    console.log("Selected plan:", planId);
  };

  const handleCompareFeatures = () => {
    console.log("Compare features clicked");
  };

  const handleNext = () => {
    router.push("/dashboard");
  };

  const handleBack = () => {
    router.push("/auth/profile/account");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start justify-between space-x-3">
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-gray-900">
              Membership Required
            </h4>
            <p className="text-gray-600">
              Please select a membership plan to continue.
            </p>
          </div>
          <span className="text-4xl lg:text-6xl">😊</span>
        </div>
      </div>
      
      <div className="space-y-6 mt-12">
        {/* Price Display Row */}

        <div className=" flex flex-col items-center lg:flex-row w-full gap-8 lg:gap-6 text-center">
          {plans.map((plan) => (
            <div key={plan.id} className=" w-full relative space-y-2">
              <div className="border border-app-border  rounded-sm py-5 ">
                <div className="absolute -top-2 -right-2  bg-app-light-pink text-white text-xs px-3 py-1 rounded-full font-medium">
                  {plan.badge}
                </div>

                <div className="text-3xl font-bold text-[#343A40]">
                  ${plan.price}
                </div>
              </div>
              <div className="text-start text-sm ">
                {plan.name}
              </div>
            </div>
          ))}
        </div>

        {/* Plan Details */}
        <div className="space-y-6 mt-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex items-center justify-between p-4 border-t border-b border-app-border "
            >
              <div>
                <h4 className="font-semibold ">{plan.name}</h4>
                <p className="text-sm ">{plan.description}</p>
              </div>
              <Button variant="theme" onClick={() => handleSelectPlan(plan.id)}>
                Select
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Compare Features Link */}
      <Link href="/auth/profile/membership/compare" className="text-center">
        <Button
          variant={"ghost"}
          onClick={handleCompareFeatures}
          className="w-full rounded-sm bg-[#F8F9FA] py-6 font-medium"
        >
          Compare Features
        </Button>
      </Link>
      {/* Navigation Buttons */}
      <div className="flex justiflex justify-center gap-6 my-16 lg:my-26">
        <Button variant="outline" onClick={handleBack} size={"lg"}>
          <span className="mr-1">
            <ArrowLeft />
          </span>
          Back
        </Button>
        <Button variant={"theme"} onClick={handleNext} size={"lg"}>
          Next
          <span className="ml-1">
            <ArrowRight />
          </span>
        </Button>
      </div>
    </div>
  );
}
