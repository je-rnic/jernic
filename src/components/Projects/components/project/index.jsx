"use client";
import React from "react";
import styles from "./style.module.scss";

/* <div onMouseEnter={() => {setModal({active: true, index})}} onMouseLeave={() => {setModal({active: false, index})}} className={styles.project}>
            <h2>{title}</h2>
            <p>Design & Development</p>
        </div> */

export default function index({ index, title, subtitle, type, setModal }) {
	return (
		<div
			onMouseEnter={() => {
				setModal({ active: true, index });
			}}
			onMouseLeave={() => {
				setModal({ active: false, index });
			}}
			className={styles.project}
		>
			<div>
				<h2>{title}</h2>
				<p>{subtitle}</p>
			</div>
			<p>{type}</p>
		</div>
	);
}
