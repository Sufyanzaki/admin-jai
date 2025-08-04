import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap transition duration-200 ease-in-out text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: "rounded-[5px] bg-app-pink text-white shadow-xs hover:bg-app-pink",
                outline: "border border-app-border rounded-[4px] shadow-xs text-gray-800 hover:bg-app-pink hover:text-white hover:border-app-pink",
                secondary: "rounded-[5px] bg-app-blue text-white shadow-xs hover:bg-app-theme",
                theme: "rounded-[5px] bg-app-theme text-white shadow-xs hover:bg-app-pink font-mon font-semibold",
                ghost: "",
                destructive: "rounded-[4px] bg-red-600 text-white hover:bg-red-700",
                link: "px-9 py-[15px] bg-white border border-neutral-200 rounded-[5px] justify-center items-center gap-2.5 sm:inline-flex text-neutral-700 text-sm font-medium whitespace-nowrap duration-300 hover:bg-red-color group-hover:text-white hidden",
                dashboard: "bg-[#2f6ca1] text-white shadow-xs hover:bg-[#285b89] rounded-[5px]",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
                lg: "h-[46px] px-5 md:px-6 xl:px-8 has-[>svg]:px-4 text-base md:text-[15px]",
                xl: "h-[60px] has-[>svg]:px-6 text-xl px-[65px]",
                icon: "size-9",
                dashboard: " h-12 px-4"
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

function Button({
                    className,
                    variant,
                    size,
                    selected,
                    asChild = false,
                    ...props
                }: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    selected?: boolean;
}) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(
                buttonVariants({ variant, size }),
                selected && "bg-app-pink text-white",
                className
            )}
            {...props}
        />
    );
}

export { Button, buttonVariants };
