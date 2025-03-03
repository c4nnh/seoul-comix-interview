"use client";

import { ImgHTMLAttributes, useState } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  defaultImageSrc?: string;
};

export function Image({
  src,
  defaultImageSrc = "/images/error-image.png",
  ...props
}: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(defaultImageSrc)}
      alt={props.alt || "image"}
    />
  );
}
