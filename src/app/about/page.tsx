import type { Metadata } from "next";
import { aboutPage } from "@/content/site";

export const metadata: Metadata = {
  title: aboutPage.title,
};

export default function AboutPage() {
  return (
    <main id="main">
      <header className="page-header container">
        <h1 className="type-display">{aboutPage.title}</h1>
      </header>

      <div className="about container">
        <div className="about__copy flow">
          {aboutPage.paragraphs.map((paragraph, index) => (
            <p key={paragraph} className={index === 0 ? "type-subtitle" : "type-body"}>
              {paragraph}
            </p>
          ))}
        </div>

        <div
          className="about__portrait"
          role="img"
          aria-label="Portrait photo placeholder"
        >
          <svg
            className="about__portrait-icon"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <rect x="5" y="5" width="38" height="38" rx="4" />
            <circle cx="18" cy="18" r="4" />
            <path d="m5 34 11-10 9 8 8-7 10 9" />
          </svg>
          <span className="type-serif" aria-hidden="true">Photo placeholder</span>
        </div>
      </div>
    </main>
  );
}
