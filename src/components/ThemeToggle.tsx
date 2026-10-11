"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "jernic-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

/** The theme currently pinned on <html> by the beforeInteractive theme script. */
function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export default function ThemeToggle() {
  // null until mounted, so server and first client render match.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(currentTheme());

    // Enable the colour fade only after first paint (no animation on load).
    const frame = requestAnimationFrame(() =>
      document.documentElement.classList.add("theme-ready"),
    );

    // Follow the OS until the visitor makes an explicit choice.
    const media = window.matchMedia(DARK_QUERY);
    const onSystemChange = () => {
      if (storedTheme() !== null) return;
      const next: Theme = media.matches ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    media.addEventListener("change", onSystemChange);

    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", onSystemChange);
    };
  }, []);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage blocked: the choice still applies for this visit */
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Dark mode"
      className="theme-toggle"
      onClick={toggle}
    >
      <span className="theme-toggle__knob" aria-hidden="true">
        <svg className="theme-toggle__icon theme-toggle__icon--sun" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        <svg className="theme-toggle__icon theme-toggle__icon--moon" viewBox="0 0 24 24">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </span>
    </button>
  );
}
