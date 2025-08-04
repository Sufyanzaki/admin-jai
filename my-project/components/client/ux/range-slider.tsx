"use client";

import * as React from "react";
import * as Slider from "@radix-ui/react-slider";

type RangeSliderProps = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
  unit?: string;
};

export function RangeSlider({
  min,
  max,
  value,
  onChange,
  unit = "",
}: RangeSliderProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);

  // Calculate percentage positions of thumbs
  const getThumbPercent = (val: number) => ((val - min) / (max - min)) * 100;
  const startPercent = getThumbPercent(value[0]);
  const endPercent = getThumbPercent(value[1]);

  return (
    <div className="w-full mx-auto">
      {/* Labels above thumbs */}
      <div className="relative h-6">
        <div
          className="absolute text-xs font-medium text-gray-800 -translate-x-1/2 whitespace-nowrap"
          style={{ left: `${startPercent}%` }}
        >
          {value[0]} {unit}
        </div>
        <div
          className="absolute text-xs font-medium text-gray-800 -translate-x-1/2 whitespace-nowrap"
          style={{ left: `${endPercent}%` }}
        >
          {value[1]} {unit}
        </div>
      </div>

      {/* Slider */}
      <Slider.Root
        className="-mt-1 relative flex items-center select-none touch-none w-full h-5"
        min={min}
        max={max}
        step={1}
        value={value}
        onValueChange={(val) => onChange(val as [number, number])}
      >
        <Slider.Track
          ref={trackRef}
          className="bg-app-light-pink/20 relative grow rounded-full h-[6px]"
        >
          <Slider.Range className="absolute bg-app-pink rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="border-app-pink bg-app-pink ring-app-light-pink/30 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50" />
        <Slider.Thumb className="border-app-pink bg-app-pink ring-app-light-pink/30 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50" />
      </Slider.Root>
    </div>
  );
}
