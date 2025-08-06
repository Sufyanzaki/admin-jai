"use client";

import { Controller } from "react-hook-form";
import { useRef } from "react";
import {Input} from "@/components/client/ux/input";

import { Control, FieldValues } from "react-hook-form";

interface OtpInputProps {
    control: Control<FieldValues>;
    name: string;
    length?: number;
}

export const OtpInput = ({ control, name, length = 5 }: OtpInputProps) => {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field: { value = "", onChange } }) => (
                <div className="flex justify-center gap-3">
                    {Array.from({ length }).map((_, index) => (
                        <Input
                            key={index}
                            ref={(el) => {
                                inputsRef.current[index] = el;
                            }}
                            type="text"
                            maxLength={1}
                            value={value[index] || ""}
                            onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9]/g, "");
                                if (!val) return;

                                const otpArr = value.split("");
                                otpArr[index] = val;
                                const newOtp = otpArr.join("").padEnd(length, "");
                                onChange(newOtp);

                                setTimeout(() => {
                                    if (val && index < length - 1) {
                                        inputsRef.current[index + 1]?.focus();
                                    }
                                }, 0);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace") {
                                    const otpArr = value.split("");
                                    otpArr[index] = "";
                                    onChange(otpArr.join("").padEnd(length, ""));

                                    if (!value[index] && index > 0) {
                                        inputsRef.current[index - 1]?.focus();
                                    }
                                }
                            }}
                            className="h-12 w-12 text-center text-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                        />
                    ))}
                </div>
            )}
        />
    );
};
