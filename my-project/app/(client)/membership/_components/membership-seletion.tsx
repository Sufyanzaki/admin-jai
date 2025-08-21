"use client";

import { Button } from "@/components/client/ux/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePackages } from "@/app/shared-hooks/usePackages";
import { PackageDto } from "@/app/shared-types/packages";
import { useRegistration } from "@/app/shared-hooks/useRegistration";

export function MembershipSelection() {
  const router = useRouter();
  const { registrationSettings, registrationLoading } = useRegistration();

  const { error, loading, packages } = usePackages();

  const handleCompareFeatures = () => {
    console.log("Compare features clicked");
  };

  const handleNext = () => {
    router.push("/dashboard");
  };

  const handleBack = () => {
    router.back();
  };

  if (loading || registrationLoading) {
    return <p className="text-gray-500">Loading membership plans...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load membership plans.</p>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-12">
        <div className="flex items-start justify-between space-x-3">
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-gray-900">
              {registrationSettings?.step6Title}
            </h4>
            <p className="text-gray-600">
              {registrationSettings?.step6Description}
            </p>
          </div>
          <span className="text-4xl lg:text-6xl">😊</span>
        </div>
      </div>

      <div className="space-y-6 mt-12">
        <div className="flex flex-col items-center lg:flex-row w-full gap-8 lg:gap-6 text-center">
          {packages?.map((plan: PackageDto) => (
            <div key={plan.id} className="w-full relative space-y-2">
              <div className="border border-app-border rounded-sm py-5 ">
                <div className="absolute -top-2 -right-2 bg-app-light-pink text-white text-xs px-3 py-1 rounded-full font-medium">
                  {plan.validity} Days
                </div>

                <div className="text-3xl font-bold text-[#343A40]">
                  ${plan.price}
                </div>
              </div>
              <div className="text-start text-sm">{plan.name}</div>
            </div>
          ))}
        </div>

        <div className="space-y-6 mt-12">
          {packages?.map((plan: PackageDto) => (
            <div
              key={plan.id}
              className="flex items-center justify-between p-4 border-t border-b border-app-border "
            >
              <div>
                <h4 className="font-semibold">{plan.name}</h4>
                <p className="text-sm">
                  {plan.features
                    ? plan.features
                    : `Valid for ${plan.validity} days.`}
                </p>
              </div>
              <Button
                variant="theme"
                onClick={() =>
                  router.push(`/membership/payment/${plan.id}`)
                }
              >
                Select
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Link href="/membership/compare" className="w-full">
        <Button
            variant="ghost"
            onClick={handleCompareFeatures}
            className="w-full rounded-sm bg-[#F8F9FA] py-6 font-medium"
        >
          Compare Features
        </Button>
      </Link>

      <div className="flex justify-center gap-6 my-16 lg:my-26">
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
