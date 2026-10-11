import Image from "next/image";
import type { Work } from "@/content/work/works";
import { formatPeriod } from "@/content/work/queries";
import ArrowLink from "../ArrowLink";

/** Top of a case study. Reuses the home hero layout; all data comes from the registry. */
export default function CaseStudyHeader({ work }: { work: Work }) {
  return (
    <header className="hero case-header container">
      <div className="hero__text">
        <div className="case-header__back">
          <ArrowLink href="/works" direction="back">
            all works
          </ArrowLink>
        </div>

        <h1 className="type-display">{work.title}</h1>
        <p className="case-header__summary type-subtitle">{work.summary}</p>

        <dl className="case-meta">
          <div>
            <dt className="type-body">Role</dt>
            <dd className="type-small">
              <ul>
                {work.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="type-body">Timeline</dt>
            <dd className="type-small">{formatPeriod(work)}</dd>
          </div>
          {work.scope && (
            <div>
              <dt className="type-body">Scope</dt>
              <dd className="type-small">
                <ul>
                  {work.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="hero__media">
        {work.cover ? (
          <Image
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
