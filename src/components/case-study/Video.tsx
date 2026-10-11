const TYPES: Record<string, string> = {
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
};

/**
 * Video with controls and a caption. Nothing downloads until the visitor
 * presses play (`preload="metadata"`). Prefer .mp4 (H.264) or .webm:
 * .mov only plays in Safari.
 */
export default function Video({
  src,
  poster,
  caption,
  label,
}: {
  src: string;
  poster?: string;
  caption?: string;
  /** Accessible name, e.g. "Walkthrough of the onboarding flow". */
  label: string;
}) {
  const ext = src.split(".").pop()?.toLowerCase() ?? "";
  return (
    <figure className="figure">
      <video
        className="figure__video"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
      >
        <source src={src} type={TYPES[ext]} />
        Your browser can&apos;t play this video.
      </video>
      {caption && (
        <figcaption className="figure__caption type-serif">{caption}</figcaption>
      )}
    </figure>
  );
}
