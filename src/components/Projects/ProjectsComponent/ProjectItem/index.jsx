import React from "react";
import styles from "./style.module.scss";

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
