"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";
import Project from "./components/project";
import {
	SiConfluence,
	SiCss,
	SiFigma,
	SiFirebase,
	SiGit,
	SiGithub,
	SiGooglemaps,
	SiHtml5,
	SiJavascript,
	SiNetlify,
	SiPython,
	SiQuarto,
	SiReact,
	SiStripe,
	SiTailwindcss,
	SiVuedotjs,
} from "react-icons/si";
import { FaProjectDiagram } from "react-icons/fa";
import { FiCode } from "react-icons/fi";
import { TbApi } from "react-icons/tb";

const TECHNOLOGY_ICON_MAP = {
	react: SiReact,
	javascript: SiJavascript,
	"tailwind css": SiTailwindcss,
	python: SiPython,
	"hugging face": FaProjectDiagram,
	"rest apis": TbApi,
	figma: SiFigma,
	git: SiGit,
	confluence: SiConfluence,
	gis: FaProjectDiagram,
	mcda: FaProjectDiagram,
	quarto: SiQuarto,
	netlify: SiNetlify,
	github: SiGithub,
	html: SiHtml5,
	css: SiCss,
	vue: SiVuedotjs,
	firebase: SiFirebase,
	stripe: SiStripe,
	"google maps api": SiGooglemaps,
};

function getTechnologyIcon(technology) {
	const normalized = technology.toLowerCase().trim();
	return TECHNOLOGY_ICON_MAP[normalized] || FiCode;
}

function renderSection(section, index) {
	if (!section || typeof section !== "object") {
		return null;
	}

	if (section.type === "text" && section.body) {
		return (
			<section
				key={`${section.type}-${index}`}
				className={styles.detailSection}
			>
				{section.title && <h4>{section.title}</h4>}
				<p>{section.body}</p>
			</section>
		);
	}

	if (
		section.type === "bullets" &&
		Array.isArray(section.items) &&
		section.items.length
	) {
		return (
			<section
				key={`${section.type}-${index}`}
				className={styles.detailSection}
			>
				{section.title && <h4>{section.title}</h4>}
				<ul>
					{section.items.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</section>
		);
	}

	if (section.type === "video" && section.src) {
		return (
			<section
				key={`${section.type}-${index}`}
				className={styles.detailSection}
			>
				{section.title && <h4>{section.title}</h4>}
				<video
					className={styles.media}
					src={section.src}
					poster={section.poster || undefined}
					autoPlay={section.autoplay !== false}
					loop={section.loop !== false}
					muted={section.muted !== false}
					controls={Boolean(section.controls)}
					playsInline
				/>
				{section.caption && (
					<p className={styles.mediaCaption}>{section.caption}</p>
				)}
			</section>
		);
	}

	if (section.type === "gif" && section.src) {
		return (
			<section
				key={`${section.type}-${index}`}
				className={styles.detailSection}
			>
				{section.title && <h4>{section.title}</h4>}
				<img
					className={styles.media}
					src={section.src}
					alt={section.alt || "Project media"}
				/>
				{section.caption && (
					<p className={styles.mediaCaption}>{section.caption}</p>
				)}
			</section>
		);
	}

	return null;
}

export default function ProjectsAccordion({ projects }) {
	const [activeSlug, setActiveSlug] = useState(null);
	const availableSlugs = useMemo(
		() => new Set(projects.map((project) => project.slug)),
		[projects],
	);

	useEffect(() => {
		const syncFromHash = () => {
			const hashSlug = window.location.hash.replace(/^#/, "");
			if (hashSlug && availableSlugs.has(hashSlug)) {
				setActiveSlug(hashSlug);
			} else {
				setActiveSlug(null);
			}
		};

		syncFromHash();
		window.addEventListener("hashchange", syncFromHash);
		return () => window.removeEventListener("hashchange", syncFromHash);
	}, [availableSlugs]);

	useEffect(() => {
		const nextHash = activeSlug ? `#${activeSlug}` : "";
		const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;

		if (
			`${window.location.pathname}${window.location.search}${window.location.hash}` !==
			nextUrl
		) {
			window.history.replaceState(null, "", nextUrl);
		}
	}, [activeSlug]);

	const toggleProject = useCallback((slug) => {
		setActiveSlug((current) => (current === slug ? null : slug));
	}, []);

	return (
		<div className={styles.body}>
			{projects.map((project) => {
				const isActive = activeSlug === project.slug;
				return (
					<div key={project.slug} className={styles.itemWrap} id={project.slug}>
						<Project
							title={project.title}
							subtitle={project.subtitle}
							role={project.roleShort}
							isActive={isActive}
							onToggle={() => toggleProject(project.slug)}
						/>

						{isActive && (
							<div className={styles.expandPanel}>
								<div className={styles.expandInner}>
									<div className={styles.metaGrid}>
										<div>
											<h3>Role</h3>
											<p>{project.role}</p>
										</div>
										<div>
											<h3>Timeline</h3>
											<p>{project.timeline}</p>
										</div>
									</div>

									{project.award && (
										<section className={styles.detailSection}>
											<h4>Award</h4>
											{project.awardLink ? (
												<a
													href={project.awardLink}
													target="_blank"
													rel="noreferrer"
													className={styles.awardLink}
												>
													{project.award}
												</a>
											) : (
												<p>{project.award}</p>
											)}
										</section>
									)}

									{Array.isArray(project.sections) &&
										project.sections.map((section, index) =>
											renderSection(section, index),
										)}

									{!!project.technologies.length && (
										<section className={styles.detailSection}>
											<h4>Technologies</h4>
											<div className={styles.techRow}>
												{project.technologies.map((technology) => (
													<div key={technology} className={styles.techItem} title={technology}>
														{(() => {
															const Icon = getTechnologyIcon(technology);
															return <Icon className={styles.techIcon} aria-hidden="true" />;
														})()}
														<span>{technology}</span>
													</div>
												))}
											</div>
										</section>
									)}

									{!!project.highlights.length && (
										<section className={styles.detailSection}>
											<h4>Highlights</h4>
											<ul>
												{project.highlights.map((highlight) => (
													<li key={highlight}>{highlight}</li>
												))}
											</ul>
										</section>
									)}

									{project.link && (
										<a
											className={styles.primaryLink}
											href={project.link}
											target="_blank"
											rel="noreferrer"
										>
											Visit project link
										</a>
									)}
								</div>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
