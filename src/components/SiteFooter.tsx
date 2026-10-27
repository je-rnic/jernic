const contactLinks = [
  { label: "Email", href: "mailto:yeojernic@gmail.com", icon: "email" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jernicyeo",
    icon: "linkedin",
  },
] as const;

function ContactIcon({ type }: { type: "email" | "linkedin" }) {
  if (type === "email") {
    return (
      <svg
        className="site-footer__icon site-footer__icon--email"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }

  return (
    <svg
      className="site-footer__icon site-footer__icon--linkedin"
      viewBox="-2 -2 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d='M19.959 11.719v7.379h-4.278v-6.885c0-1.73-.619-2.91-2.167-2.91-1.182 0-1.886.796-2.195 1.565-.113.275-.142.658-.142 1.043v7.187h-4.28s.058-11.66 0-12.869h4.28v1.824l-.028.042h.028v-.042c.568-.875 1.583-2.126 3.856-2.126 2.815 0 4.926 1.84 4.926 5.792zM2.421.026C.958.026 0 .986 0 2.249c0 1.235.93 2.224 2.365 2.224h.028c1.493 0 2.42-.989 2.42-2.224C4.787.986 3.887.026 2.422.026zM.254 19.098h4.278V6.229H.254v12.869z' />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner container">
        <p className="site-footer__eyebrow type-eyebrow">contact</p>
        <h2 className="site-footer__title type-display">
          Let&apos;s work
          <span>together.</span>
        </h2>
        <nav aria-label="Contact links">
          <ul className="site-footer__links">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="site-footer__link"
                  href={link.href}
                  aria-label={link.label}
                >
                  <ContactIcon type={link.icon} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-footer__details type-label">
          <p>Based in Singapore</p>
          <p>© 2026 Copyright. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
