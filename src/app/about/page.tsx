import type { Metadata } from "next";
import { aboutPage } from "@/content/site";
import FadeImage from "@/components/FadeImage";

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

        <div className="about__portrait">
          <FadeImage
            src="/images/background-cropped.jpg"
            alt="Portrait of Jernic outdoors"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
      </div>
    </main>
  );
}
