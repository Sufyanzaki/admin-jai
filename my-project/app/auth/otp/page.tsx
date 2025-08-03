"use client"

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useOTPForm from "../_hooks/useOTPForm";
import useResendOtp from "../_hooks/useResendOtp";
import { useSearchParams } from "next/navigation";
import { Controller } from "react-hook-form";

export default function OtpPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  
  const {
    control,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
  } = useOTPForm();

  const { resendOtp, isLoading: isResending } = useResendOtp();

  const handleResend = () => {
    if (email) {
      resendOtp(email);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img
            src="https://ticketprijs.nl/admin/logoImages/1730182765_logo%20(1).png"
            alt="Logo"
            className="mx-auto"
          />
        </div>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-xl text-white">Verify OTP</CardTitle>
            <CardDescription className="text-gray-400">
              Enter the 5-digit code sent to your email
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(r => onSubmit(r))}>
            <CardContent className="space-y-6">
              <Controller
                name="otp"
                control={control}
                defaultValue=""
                render={({ field: { value = '', onChange } }) => (
                  <div className="flex justify-center gap-3">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <Input
                        key={index}
                        ref={el => {
                          inputsRef.current[index] = el;
                        }}
                        type="text"
                        maxLength={1}
                        value={value[index] || ''}
                        onChange={e => {
                          const val = e.target.value.replace(/[^0-9]/g, "");
                          if (!val) return;
                          const otpArr = value.split("");
                          otpArr[index] = val;
                          const newOtp = otpArr.join("").padEnd(5, "");
                          onChange(newOtp);
                          setTimeout(() => {
                            if (val && index < 4) {
                              inputsRef.current[index + 1]?.focus();
                            }
                          }, 0);
                        }}
                        onKeyDown={e => {
                          if (e.key === "Backspace") {
                            const otpArr = value.split("");
                            otpArr[index] = "";
                            onChange(otpArr.join("").padEnd(5, ""));
                            if (!value[index] && index > 0) {
                              inputsRef.current[index - 1]?.focus();
                            }
                          }
                        }}
                        className="h-10 w-10 text-center text-xl bg-gray-800 text-white border-gray-700 focus-visible:ring-blue-600"
                      />
                    ))}
                  </div>
                )}
              />
              {errors.otp && (
                <div className="text-red-500 text-center text-sm">{errors.otp.message}</div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
              <p className="text-center text-sm text-gray-400">
                Didn't receive code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="underline cursor-pointer hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? "Sending..." : "Resend"}
                </button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
