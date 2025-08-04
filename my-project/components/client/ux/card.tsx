import * as React from "react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <div
          data-slot="card"
          className={cn(
              "bg-white text-card-foreground flex flex-col rounded-xl border border-[#E0E0E0] shadow-sm",
              className
          )}
          {...props}
      />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <div
          data-slot="card-header"
          className={cn("px-4 py-4 flex justify-center", className)}
          {...props}
      />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <h3
          data-slot="card-title"
          className={cn("text-lg font-semibold", className)}
          {...props}
      />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <p
          data-slot="card-description"
          className={cn("text-sm text-muted-foreground", className)}
          {...props}
      />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <div
          data-slot="card-action"
          className={cn("ml-auto", className)}
          {...props}
      />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <div
          data-slot="card-content"
          className={cn("px-4 pb-4 space-y-4", className)}
          {...props}
      />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <div
          data-slot="card-footer"
          className={cn("px-4 pb-6 pt-2 flex flex-col items-center text-center text-xs text-muted-foreground", className)}
          {...props}
      />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
};
