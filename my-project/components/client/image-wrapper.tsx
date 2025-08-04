// components/ImageWrapper.tsx
import Image, { ImageProps } from "next/image";
import React from "react";

type Props = Omit<ImageProps, "fill"> & {
  className?: string;
  fill?: boolean;
};

const ImageWrapper = React.forwardRef<HTMLImageElement, Props>((props, ref) => {
  const {
    className,
    style,
    fill,
    width,
    height,
    ...rest
  } = props;

  const isFill = fill ?? (!width && !height); // use fill if it's explicitly true or if width/height are not provided

  return (
    <div className={`relative ${className || ""}`} style={style}>
      <Image
        {...rest}
        ref={ref}
        className="object-cover"
        fill={isFill}
        width={isFill ? undefined : width}
        height={isFill ? undefined : height}
        alt="image"
      />
    </div>
  );
});

ImageWrapper.displayName = "ImageWrapper";

export default ImageWrapper;
