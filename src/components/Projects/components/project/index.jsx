import React from "react";
import styles from "./style.module.scss";

/* <div onMouseEnter={() => {setModal({active: true, index})}} onMouseLeave={() => {setModal({active: false, index})}} className={styles.project}>
            <h2>{title}</h2>
            <p>Design & Development</p>
        </div> */

export default function index({ title, subtitle, role, isActive, onToggle }) {
	return (
		<button
			type="button"
			onClick={onToggle}
			className={`${styles.project} ${isActive ? styles.active : ""}`}
			aria-expanded={isActive}
		>
			<div className={styles.leftContent}>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.subtitle}>{subtitle}</p>
			</div>
			<p className={styles.role}>{role}</p>
		</button>
	);
}
