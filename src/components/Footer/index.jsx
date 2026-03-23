import styles from "./style.module.scss";
import { MdOutlineMail } from "react-icons/md";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const CONTACT_LINKS = [
	{
		label: "Email",
		href: "mailto:yeojernic@gmail.com",
		icon: MdOutlineMail,
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/jernicyeo",
		icon: FaLinkedinIn,
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/je.rnic",
		icon: FaInstagram,
	},
	{
		label: "GitHub",
		href: "https://github.com/je-rnic",
		icon: FaGithub,
	},
];

export default function Footer() {
	return (
		<footer className={styles.footer} aria-label="Contact links">
			<div className={styles.inner}>
                <p className={styles.copyright}>Contact</p>
                <p className={styles.title}>Let's work together.</p>
				<ul className={styles.iconList}>
					{CONTACT_LINKS.map(({ label, href, icon: Icon }) => (
						<li key={label}>
							<a
								className={styles.iconLink}
								href={href}
								target="_blank"
								rel="noreferrer"
								aria-label={label}
								title={label}
							>
								<Icon aria-hidden="true" />
							</a>
						</li>
					))}
				</ul>

				<p className={styles.meta}>Based in Singapore</p>
				<p className={styles.copyright}> © 2026 COPYRIGHT ALLRIGHTSRESERVED</p>
			</div>
		</footer>
	);
}
