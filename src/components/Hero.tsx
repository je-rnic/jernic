import FadeImage from "./FadeImage";
import { heroImage } from "@/content/site";

export default function Hero() {
  return (
    <div className="hero container">
      <div className="hero__text">
        <p className="hero__eyebrow type-eyebrow">hello, I&apos;m Jernic</p>

        <h1 className="hero__title">
          <span className="type-subtitle">
            a <em>&lt;software engineer&gt;</em> turned product designer that builds
          </span>
          <span className="type-display">intuitive user experiences</span>
          <span className="type-subtitle">
            centred around <strong>data</strong>, <strong>design</strong> and{" "}
            <strong>accessibility</strong>
          </span>
        </h1>
      </div>

      <div className="hero__media">
        {heroImage ? (
          <FadeImage
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            sizes="(min-width: 768px) 37vw, 100vw"
            priority
          />
        ) : (
          <div className="hero__placeholder" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
