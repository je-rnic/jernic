"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { useState } from "react";
import Project from "./components/project";

export default function Home() {
	const projects = [
		{
			title: "Checkmate",
			subtitle: "LLM-Enabled News Analysis Platform",
			src: "c2montreal.png",
			color: "#000000",
			type:'Design & Development',
		},
		{
			title: "WFH Tracking System",
			subtitle: "Facilitating Communications between Employees and Managers",
			src: "officestudio.png",
			color: "#8C8C8C",
			type:'Development',
		},
		{
			title: "FoodForGood",
			subtitle: "Bridging the Gap in Food Donation Drives",
			src: "locomotive.png",
			color: "#EFE8D3",
			type:'Design',
		},
	];

	const [modal, setModal] = useState({ active: false, index: 0 });
	return (
		<main className={styles.main}>
			<div className={styles.body}>
				{projects.map((projects, index) => {
					return (
						<Project
							key={index}
							index={index}
							title={projects.title}
							subtitle={projects.subtitle}
							type={projects.type}
							setModal={setModal}
						/>
					);
				})}
			</div>
		</main>
	);
}
