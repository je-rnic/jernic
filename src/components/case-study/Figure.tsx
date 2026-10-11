import Image from "next/image";

/**
 * Image with caption. No pixel size needed: give an `aspect` ("16/9", "4/3")
 * and the image fills that box. Leave `src` out to reserve a placeholder
 * (useful while a screenshot or diagram is still to come).
 *
 * `fit="contain"` (default) never crops, which is right for UI screenshots.
 * `fit="cover"` crops to fill, which is right for photos.
 */
export default function Figure({
  src,
  alt = "",
  caption,
  aspect = "3/2",
  fit = "contain",
}: {
  src?: string;
  alt?: string;
  caption?: string;
  aspect?: string;
  fit?: "contain" | "cover";
}) {
  return (
    <figure className="figure">
      <div className="figure__media" style={{ aspectRatio: aspect }}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            style={{ objectFit: fit }}
          />
        ) : null}
      </div>
      {caption && (
        <figcaption className="figure__caption type-serif">{caption}</figcaption>
      )}
    </figure>
  );
}
