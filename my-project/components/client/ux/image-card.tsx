import React from "react";
import Image from "next/image";

type ImageCardProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string; // extra Tailwind classes
};

export default function ImageCard({
                                    src,
                                    alt,
                                    width,
                                    height,
                                    fill = false,
                                    className = "",
                                  }: ImageCardProps) {
  return (
      <div className={`group overflow-hidden rounded-lg relative ${className}`}>
        {fill ? (
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
        ) : (
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
        )}
      </div>
  );
}
