"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

type SliderProps = Omit<React.ComponentProps<typeof SliderPrimitive.Root>, "value" | "defaultValue" | "onValueChange"> & {
  value: number
  defaultValue?: number
  onValueChange: (val: number) => void
  unit?: string
}

function Slider({
  className,
  defaultValue = 0,
  value,
  onValueChange,
  min = 0,
  max = 100,
  unit = "",
  ...props
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <SliderPrimitive.Root
      value={[value]}
      onValueChange={(val) => onValueChange(val[0])}
      min={min}
      max={max}
      defaultValue={[defaultValue]}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="bg-app-light-pink/20 relative grow overflow-hidden rounded-full h-1.5 w-full">
        <SliderPrimitive.Range className="bg-app-pink absolute h-full" />
      </SliderPrimitive.Track>

      {/* Value label */}
      <span
        className="absolute -top-7 text-xs font-medium text-app-gray transition-all"
        style={{
          left: `calc(${percentage}% - 16px)`, // adjust label centering
        }}
      >
        {value}
        {unit}
      </span>

      {/* Thumb */}
      <SliderPrimitive.Thumb
        className="border-app-pink bg-app-pink ring-app-light-pink/30 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
      />
    </SliderPrimitive.Root>
  )
}

export { Slider }
