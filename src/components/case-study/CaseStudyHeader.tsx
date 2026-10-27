import FadeImage from "../FadeImage";
import type { Work } from "@/content/work/works";
import { formatPeriod, yearOf } from "@/content/work/queries";
import BackButton from "../BackButton";

/** Top of a case study. Reuses the home hero layout; all data comes from the registry. */
export default function CaseStudyHeader({ work }: { work: Work }) {
  return (
    <header className="hero case-header container">
      <div className="hero__text">
        <div className="case-header__back">
          <BackButton />
        </div>

        <p className="case-header__eyebrow">
          {work.productType ?? "Case Study"} · {yearOf(work)}
        </p>
        <h1 className="type-display">{work.title}</h1>
        <p className="case-header__summary type-subtitle">{work.summary}</p>
        
        <dl className="case-serif">
          <div>
            <dt className="type-title">Role</dt>
            <dd className="type-body">
              <ul>
                {work.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="type-title">Timeline</dt>
            <dd className="type-body">{formatPeriod(work)}</dd>
          </div>
        </dl>

        {/* Uncomment this block to enable the work stats on the heading page
        <dl className="case-serif">
          {work.stat && (
            <div>
              <dt className="type-subtitle">{work.stat.label}</dt>
              <dd className="type-body">{work.stat.value}</dd>
            </div>
          )}
        </dl>
        */}

      </div>

      <div className="hero__media">
        {work.cover ? (
          <FadeImage
            src={work.cover.src}
            alt={work.cover.alt}
            fill
            sizes="(min-width: 768px) 37vw, 100vw"
            priority
          />
        ) : (
          <div className="hero__placeholder" aria-hidden="true" />
        )}
      </div>
    </header>
  );
}
