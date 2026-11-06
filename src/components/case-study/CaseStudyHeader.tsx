import FadeImage from "../FadeImage";
import type { Work } from "@/content/work/works";
import { formatPeriod, yearOf } from "@/content/work/queries";
import BackButton from "../BackButton";
import MetadataList from "./MetadataList";
import MediaFrame from "../media/MediaFrame";

/** Top of a case study. Reuses the home hero layout; all data comes from the registry. */
export default function CaseStudyHeader({ work }: { work: Work }) {
	return (
		<header className="hero case-header container">
			<div className="hero__text">
				<div className="case-header__back">
					<BackButton />
				</div>

				<p className="case-header__eyebrow type-label text-muted">
					{work.categoryLabel ?? "Case Study"} · {yearOf(work)}
				</p>
				<h1 className="type-display">{work.title}</h1>
				<p className="case-header__summary type-subtitle">{work.summary}</p>

				<MetadataList
					items={[
						{
							label: "Role",
							value: (
								<ul>
									{work.roles.map((role) => (
										<li key={role}>{role}</li>
									))}
								</ul>
							),
						},
						{ label: "Timeline", value: formatPeriod(work) },
					]}
				/>
			</div>

			<MediaFrame className="hero__media" fit="cover" fill>
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
			</MediaFrame>
		</header>
	);
}
