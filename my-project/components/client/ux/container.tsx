import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("w-full mx-auto overflow-x-hidden", {
  variants: {
    size: {
      default:
        "max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-[1720px] px-6 sm:px-10 xl:px-[100px]",
      small:
        "max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-[1310px] px-6 sm:px-10 xl:px-[100px] [@media(min-width:1470px)]:px-5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type ContainerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants> & {
    asChild?: boolean;
  };

function Container({ className, size = "default", ...props }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ size }), className)} {...props} />
  );
}

export { Container, containerVariants };
