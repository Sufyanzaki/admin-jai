import * as React from "react";
import { Label } from "@/components/client/ux/label";
import { cn } from "@/lib/utils";
import {Button} from "@/components/client/ux/button";

type Option = {
    label: string;
    value: string;
};

type RadioButtonGroupProps = {
    name: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    className?: string;
};

export function RadioButtonGroup({
                                     name,
                                     options,
                                     value,
                                     onChange,
                                     label,
                                     className,
                                 }: RadioButtonGroupProps) {
    return (
        <div>
            {label && <Label>{label}</Label>}
            <div className={cn("grid grid-cols-2 gap-4", className)}>
                {options.map((option) => {
                    const isSelected = option.value === value;
                    return (
                        <Button
                            key={option.value}
                            type="button"
                            role="radio"
                            variant={isSelected ? "default" : "outline"}
                            className="w-full"
                            size="lg"
                            aria-checked={isSelected}
                            onClick={() => onChange(option.value)}
                        >
                            <span className="font-light">{option.label}</span>
                            <span className="sr-only hidden">{name}</span>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
