"use client";

import { useEffect, useState } from "react";

const roles = [
  "Barista",
  "Software Engineer",
  "Pianist",
  "Nature Lover",
  "Electric Guitarist",
  "Videographer",
  "Dancer",
  "UX Designer",
];

const tickerRotationMs = 2500;
const tickerTransitionMs = 460;

export default function LandingBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const loopedRoles = [...roles, roles[0]];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () =>
      setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (activeIndex === roles.length) {
      const resetTimer = window.setTimeout(() => {
        setIsResetting(true);
        setActiveIndex(0);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsResetting(false));
        });
      }, tickerTransitionMs);

      return () => window.clearTimeout(resetTimer);
    }

    const rotationTimer = window.setTimeout(() => {
      setActiveIndex((previous) => previous + 1);
    }, tickerRotationMs);

    return () => window.clearTimeout(rotationTimer);
  }, [activeIndex, prefersReducedMotion]);

  return (
    <div className="landing__bar container">
      <p className="type-body">
        i am also a{" "}
        <span
          className="landing__ticker-window"
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            className={`landing__ticker-track${isResetting ? " landing__ticker-track--reset" : ""}`}
            style={{
              transform: `translateY(calc(-1 * ${activeIndex} * var(--ticker-step)))`,
            }}
          >
            {loopedRoles.map((role, index) => (
              <span
                key={`${role}-${index}`}
                className="landing__ticker-item type-eyebrow"
              >
                {role}
              </span>
            ))}
          </span>
        </span>
      </p>
      <a className="landing__bar-link type-body" href="#work">
        my works <span aria-hidden="true">↓</span>
      </a>
    </div>
  );
}
