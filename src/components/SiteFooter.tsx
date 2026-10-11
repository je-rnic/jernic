const contactLinks = [
  { label: "Email", href: "mailto:yeojernic@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jernicyeo" },
];

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
                <a className="site-footer__link type-body" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
