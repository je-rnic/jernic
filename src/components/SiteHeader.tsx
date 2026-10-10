import { site } from "@/content/site";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <a href="/" className="type-eyebrow">
          <span aria-hidden="true">{site.logo}</span>
          <span className="visually-hidden">{site.name} — home</span>
        </a>

        <div className="site-header__actions">
          <nav aria-label="Primary">
            <ul className="nav-list">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a className="nav-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
