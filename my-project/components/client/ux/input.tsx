"use client"

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import {Label} from "@/components/client/ux/label";

type InputProps = React.ComponentProps<"input"> & {
    label?: string;
};

function Input({ className, type = "text", label, id, ...props }: InputProps) {
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = React.useState(false);
    const inputId = id || "";

    return (
        <div className="space-y-2">
            {label && <Label htmlFor={inputId}>{label}</Label>}

            <div className="relative">
                <input
                    id={inputId}
                    type={isPassword ? (showPassword ? "text" : "password") : type}
                    className={cn(
                        "flex h-10 w-full rounded-[5px] border border-app-border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-app-pink disabled:cursor-not-allowed disabled:opacity-50",
                        isPassword && "pr-10",
                        className
                    )}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center text-gray-500"
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                )}
            </div>
        </div>
    );
}

export { Input };
