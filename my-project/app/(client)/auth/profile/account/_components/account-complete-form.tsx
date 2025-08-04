"use client";

import { useState } from "react";
import { Button } from "@/components/client/ux/button";
import { Input } from "@/components/client/ux/input";
import { Label } from "@/components/client/ux/label";
import { Checkbox } from "@/components/client/ux/checkbox";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface AccountData {
  username: string;
  password: string;
  repeatPassword: string;
  contactEmail: string;
  acceptTerms: boolean;
  acceptEmails: boolean;
}

export function AccountCompleteForm() {
  const router = useRouter();
  const [accountData, setAccountData] = useState<AccountData>({
    username: "",
    password: "",
    repeatPassword: "",
    contactEmail: "",
    acceptTerms: true,
    acceptEmails: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<AccountData>>({});

  const handleInputChange = (
    field: keyof AccountData,
    value: string | boolean
  ) => {
    setAccountData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AccountData> = {};

    if (!accountData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (accountData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!accountData.password) {
      newErrors.password = "Password is required";
    } else if (accountData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!accountData.repeatPassword) {
      newErrors.repeatPassword = "Please repeat your password";
    } else if (accountData.password !== accountData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    if (!accountData.contactEmail.trim()) {
      newErrors.contactEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(accountData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    router.push("/auth/profile/membership");

    if (validateForm()) {
      console.log("Account creation data:", accountData);
      handleAccountCreation().finally();
    }
  };

  const handleAccountCreation = async () => {
    try {
      console.log("Creating account and completing profile...");
    } catch (error) {
      console.error("Account creation failed:", error);
    }
  };

  const handleBack = () => {
    router.push("/auth/profile/photos");
    console.log("Going back...");
  };

  return (
    <div className="space-y-8">
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
          <div className="space-y-2">
            <Label
              required
              htmlFor="username"
            >
              At what email address can we contact you?
            </Label>
            <Input
              id="username"
              value={accountData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              placeholder="Enter your username"
              className={`h-12 border-gray-300 ${
                errors.username ? "border-red-500" : ""
              }`}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-[12px]">{errors.username}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                required
                htmlFor="password"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={accountData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Create password"
                  className={`h-12 border-gray-300 pr-10 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[12px]">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                required
                htmlFor="repeatPassword"
              >
                Repeat Password
              </Label>
              <div className="relative">
                <Input
                  id="repeatPassword"
                  type={showRepeatPassword ? "text" : "password"}
                  value={accountData.repeatPassword}
                  onChange={(e) =>
                    handleInputChange("repeatPassword", e.target.value)
                  }
                  placeholder="Repeat password"
                  className={`h-12 border-gray-300 pr-10 ${
                    errors.repeatPassword ? "border-red-500" : ""
                  }`}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  {showRepeatPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              {errors.repeatPassword && (
                <p className="text-red-500 text-[12px]">
                  {errors.repeatPassword}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={accountData.acceptTerms}
              onCheckedChange={(checked) =>
                handleInputChange("acceptTerms", checked as boolean)
              }
              className="mt-0.5"
            />
            <label
              htmlFor="terms"
              className="text-[12px]  leading-relaxed font-medium"
            >
              I accept the{" "}
              <a href="/terms" className="">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" className="">
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-red-500 text-[12px] ml-6">
              {errors.acceptTerms}
            </p>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="emails"
              checked={accountData.acceptEmails}
              onCheckedChange={(checked) =>
                handleInputChange("acceptEmails", checked as boolean)
              }
              className="mt-0.5"
            />
            <label
              htmlFor="emails"
              className="text-[12px]  leading-relaxed font-medium"
            >
              I hereby give permission to receive emails from Deskloot, and I
              understand that I can always change this later.
            </label>
          </div>
        </div>
      </div>

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
