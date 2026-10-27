import type { Metadata } from "next";
import { aboutPage } from "@/content/site";
import FadeImage from "@/components/FadeImage";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main id="main">
      <header className="page-header about-header container">
        <h1 className="type-eyebrow about-header__title">{aboutPage.title}</h1>
      </header>

      <div className="about container">
        <div className="about__copy flow">
          {aboutPage.paragraphs.map((paragraph, index) => (
            <p key={paragraph} className="type-body">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="about__portrait">
          <FadeImage
            src="/images/background-about.jpeg"
            alt="Portrait of the author outdoors"
            fill
            sizes="(min-width: 90rem) 39rem, (min-width: 48rem) 45vw, 100vw"
            loading="eager"
          />
        </div>
      </div>
    </main>
  );
}
