"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type LocomotiveScroll from "locomotive-scroll";

/** One window-based scroller, shared by every route in the root layout. */
export default function SmoothScrollInitializer() {
  const pathname = usePathname();
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let generation = 0;

    const destroy = () => {
      scrollRef.current?.destroy();
      scrollRef.current = null;
      document.documentElement.removeAttribute("data-scroll-orientation");
    };

    const initialize = async () => {
      const currentGeneration = ++generation;
      destroy();
      if (preference.matches) return;

      try {
        const { default: Scroll } = await import("locomotive-scroll");
        // An import can finish after unmount or a motion preference change.
        if (disposed || currentGeneration !== generation || preference.matches) return;

        scrollRef.current = new Scroll({
          lenisOptions: {
            smoothWheel: true,
            syncTouch: false,
            lerp: 0.1,
          },
        });
      } catch {
        // Native scrolling and CSS anchor scrolling remain available.
        console.warn("Smooth scrolling could not initialize; using native scrolling.");
      }
    };

    const handleAnchor = (event: MouseEvent) => {
      const scroll = scrollRef.current;
      if (!scroll || event.defaultPrevented || event.button !== 0 ||
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.hasAttribute("download") ||
          (link.target && link.target !== "_self") || link.classList.contains("skip-link")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname ||
          url.search !== window.location.search || !url.hash) return;

      let target: HTMLElement | null;
      try {
        target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      } catch {
        return;
      }
      if (!target) return;

      // Capture before Next Link handles the click, so only one scroller runs.
      event.preventDefault();
      if (window.location.hash !== url.hash) window.history.pushState(null, "", url.hash);
      scroll.scrollTo(target, {
        onComplete: () => {
          const temporaryTabIndex = !target.hasAttribute("tabindex");
          if (temporaryTabIndex) {
            target.setAttribute("tabindex", "-1");
            target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
          }
          target.focus({ preventScroll: true });
        },
      });
    };

    void initialize();
    preference.addEventListener("change", initialize);
    document.addEventListener("click", handleAnchor, true);

    return () => {
      disposed = true;
      ++generation;
      preference.removeEventListener("change", initialize);
      document.removeEventListener("click", handleAnchor, true);
      destroy();
    };
  }, []);

  useEffect(() => {
    // Stop any momentum from the previous route without changing Next's scroll position.
    scrollRef.current?.scrollTo(window.scrollY, { immediate: true, force: true });
    scrollRef.current?.resize();
  }, [pathname]);

  return null;
}
