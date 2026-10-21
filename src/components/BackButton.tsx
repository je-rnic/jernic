"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/all-works");
  }

  return (
    <button
      type="button"
      className="arrow-link arrow-link--back type-body"
      onClick={handleBack}
      aria-label="Go back to the previous page"
    >
      <span className="arrow-link__arrow" aria-hidden="true">
        ←
      </span>
      <span className="arrow-link__label">back</span>
    </button>
  );
}
