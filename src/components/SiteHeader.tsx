import Link from "next/link";
import { site } from "@/content/site";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link href="/" className="type-eyebrow">
          <img src={site.logo} alt="" className="site-header__logo" />
          <span className="visually-hidden">{site.name} — home</span>
        </Link>

        <div className="site-header__actions">
          <nav aria-label="Primary">
            <ul className="nav-list">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link className="nav-link" href={item.href}>
                    {item.label}
                  </Link>
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
