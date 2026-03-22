import React from "react";
import Link from "next/link";
import styles from "./style.module.scss";

/* <div onMouseEnter={() => {setModal({active: true, index})}} onMouseLeave={() => {setModal({active: false, index})}} className={styles.project}>
            <h2>{title}</h2>
            <p>Design & Development</p>
        </div> */

export default function index({ slug, title, subtitle, role }) {
	return (
		<Link href={`/projects/${slug}`} className={styles.project}>
			<div className={styles.leftContent}>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.subtitle}>{subtitle}</p>
			</div>
			<p className={styles.role}>{role}</p>
		</Link>
	);
}
