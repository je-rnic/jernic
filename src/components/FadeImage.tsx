"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

function ImageWithFade({ className, onLoad, onError, ...props }: ImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // A cached image can finish before React attaches its load handler.
    if (imageRef.current?.complete) setReady(true);
  }, []);

  return (
    <Image
      {...props}
      ref={imageRef}
      className={`fade-image${className ? ` ${className}` : ""}`}
      data-fade-ready={ready ? "" : undefined}
      onLoad={(event) => {
        setReady(true);
        onLoad?.(event);
      }}
      onError={(event) => {
        // Keep alt text visible if the image cannot load.
        setReady(true);
        onError?.(event);
      }}
    />
  );
}

/** Preserve Next Image sizing and lazy loading; restart the fade for a new source. */
export default function FadeImage(props: ImageProps) {
  const source = typeof props.src === "string"
    ? props.src
    : "default" in props.src ? props.src.default.src : props.src.src;

  return <ImageWithFade key={source} {...props} />;
}
