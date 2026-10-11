import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Text link with an arrow, in the style of "my works ↓" in LandingBar.
 * `direction="back"` puts a left arrow before the label.
 */
export default function ArrowLink({
  href,
  children,
  direction = "forward",
}: {
  href: string;
  children: ReactNode;
  direction?: "forward" | "back";
}) {
  const back = direction === "back";
  const arrow = (
    <span className="arrow-link__arrow" aria-hidden="true">
      {back ? "←" : "→"}
    </span>
  );
  return (
    <Link
      href={href}
      className={`arrow-link type-body${back ? " arrow-link--back" : ""}`}
    >
      {back && arrow}
      {children}
      {!back && arrow}
    </Link>
  );
}
