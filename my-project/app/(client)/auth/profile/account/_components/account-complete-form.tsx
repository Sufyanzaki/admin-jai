"use client";

import { Button } from "@/components/client/ux/button";
import { Input } from "@/components/client/ux/input";
import { Label } from "@/components/client/ux/label";
import { Checkbox } from "@/components/client/ux/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import useProfileForm from "@/app/(client)/auth/profile/account/_hooks/useProfileForm";

export function AccountCompleteForm() {
  const router = useRouter();
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isLoading,
  } = useProfileForm();

  const handleBack = () => {
    router.push("/auth/profile/partner-preferences");
  };

  return (
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-start space-y-4">
          <div className="flex items-center justify-start space-x-3">
            <div className="min-w-8 w-8 min-h-8 h-8 lg:w-10 lg:h-10 bg-black text-white rounded-[5px] flex items-center justify-center font-bold text-base lg:text-xl">
              06
            </div>
            <p className="text-[22px] lg:text-3xl font-semibold">
              Complete your profile
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex flex-row gap-4 w-full items-center">
              <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
                New Account
              </h4>
              <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label required htmlFor="email">At what email address can we contact you?</Label>
              <Input
                  id="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className={`h-12 border-gray-300 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-[12px]">{errors.email.message}</p>}
            </div>

            {/* Password + Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label required htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Create password"
                    {...register("password")}
                    className={`h-12 border-gray-300 pr-10 ${errors.password ? "border-red-500" : ""}`}
                />
                {errors.password && <p className="text-red-500 text-[12px]">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <Label required htmlFor="confirmPassword">Repeat Password</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repeat password"
                    {...register("confirmPassword")}
                    className={`h-12 border-gray-300 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-[12px]">{errors.confirmPassword.message}</p>}
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox id="terms" checked disabled className="mt-0.5" />
              <label htmlFor="terms" className="text-[12px] leading-relaxed font-medium">
                I accept the <a href="/terms">Terms of Use</a> and <a href="/privacy-policy">Privacy Policy</a>
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="emails" checked disabled className="mt-0.5" />
              <label htmlFor="emails" className="text-[12px] leading-relaxed font-medium">
                I hereby give permission to receive emails from Humsafar, and I understand that I can always change this later.
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 my-16 lg:my-26">
          <Button variant="outline" onClick={handleBack} size="lg" type="button">
            <ArrowLeft className="mr-1" />
            Back
          </Button>
          <Button variant="theme" size="lg" disabled={isLoading} type="submit">
            Next
            <ArrowRight className="ml-1" />
          </Button>
        </div>
      </form>
  );
}
