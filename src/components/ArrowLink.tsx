import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Text link with an arrow, in the style of "my works ↓" in LandingBar.
 * `direction="back"` puts a left arrow before the label.
 * `direction="down"` puts a down arrow after the label.
 */
export default function ArrowLink({
  href,
  children,
  direction = "forward",
}: {
  href: string;
  children: ReactNode;
  direction?: "forward" | "back" | "down";
}) {
  const back = direction === "back";
  const down = direction === "down";
  const arrow = (
    <span className="arrow-link__arrow" aria-hidden="true">
      {back ? "←" : down ? "↓" : "→"}
    </span>
  );
  return (
    <Link
      href={href}
      className={`arrow-link type-body${back ? " arrow-link--back" : ""}${down ? " arrow-link--down" : ""}`}
    >
      {back && arrow}
      <span className="arrow-link__label">{children}</span>
      {!back && arrow}
    </Link>
  );
}
