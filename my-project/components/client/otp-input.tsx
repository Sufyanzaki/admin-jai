"use client";

import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { Input } from "@/components/client/ux/input";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export const OtpInput = forwardRef<HTMLInputElement[], OtpInputProps>(
  ({ value = "", onChange, length = 5 }, ref) => {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    // Expose refs to parent if needed
    useImperativeHandle(ref, () => inputsRef.current as HTMLInputElement[]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const val = e.target.value.replace(/[^0-9]/g, "");

      if (!val) return;

      const otpArr = value.split("");
      otpArr[index] = val[0];
      const newOtp = otpArr.join("").padEnd(length, "");
      onChange(newOtp);

      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }

      // If user pasted multiple digits
      if (val.length > 1) {
        const remainingChars = val.slice(1).split("");
        for (let i = 1; i < remainingChars.length + 1 && index + i < length; i++) {
          otpArr[index + i] = remainingChars[i - 1];
        }
        onChange(otpArr.join("").padEnd(length, ""));

        setTimeout(() => {
          inputsRef.current[Math.min(index + val.length, length - 1)]?.focus();
        }, 0);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace") {
        const otpArr = value.split("");
        otpArr[index] = "";
        onChange(otpArr.join("").padEnd(length, ""));

        if (!value[index] && index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
      if (pasteData) {
        const chars = pasteData.split("").slice(0, length);
        const newOtp = chars.join("").padEnd(length, "");
        onChange(newOtp);
        inputsRef.current[chars.length - 1]?.focus();
      }
    };

    return (
      <div className="flex justify-center gap-3">
        {Array.from({ length }).map((_, index) => (
          <Input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="h-12 w-12 text-center text-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
          />
        ))}
      </div>
    );
  }
);

OtpInput.displayName = "OtpInput";
