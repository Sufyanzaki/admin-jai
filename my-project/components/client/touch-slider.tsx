"use client"

import type React from "react"

import { useState, useRef } from "react"

interface TouchSliderProps {
  children: React.ReactNode[]
  currentSlide: number
  onSlideChange: (index: number) => void
}

export function TouchSlider({ children, currentSlide, onSlideChange }: TouchSliderProps) {
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return

    const endX = e.changedTouches[0].clientX
    const diffX = startX - endX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentSlide < children.length - 1) {
        onSlideChange(currentSlide + 1)
      } else if (diffX < 0 && currentSlide > 0) {
        onSlideChange(currentSlide - 1)
      }
    }

    setIsDragging(false)
  }

  return (
    <div
      ref={sliderRef}
      className="relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
